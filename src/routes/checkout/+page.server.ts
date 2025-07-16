import { error, fail, redirect } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { db } from '$lib/server/db';
import {
	usersTable,
	customerProfilesTable,
	cartItemsTable,
	printsTable,
	ordersTable,
	orderItemsTable
} from '$lib/server/db/schema';
import { countries } from '$lib/countries';

const checkoutSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().email(),
	companyName: z.string().optional(),
	mailInvoiceTo: z.string().email().optional(),
	vatNumber: z.string().optional(),
	streetAndNumber: z.string().min(1, { message: 'Street and number are required' }),
	streetAdditional: z.string().optional(),
	postalCode: z.string().min(1, { message: 'Postal code is required' }),
	city: z.string().min(1, { message: 'City is required' }),
	country: z.string().min(2, { message: 'Country is required' }),
	province: z.string().optional(),
	paymentMethod: z.enum(['ideal', 'mollie', 'apple-card', 'creditcard'], {
		errorMap: () => ({ message: 'Please select a payment method.' })
	}),
	// This is the corrected line:
	acceptTerms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions.'
	})
});

export const load = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const userId = locals.user.id;

	const userResult = await db
		.select()
		.from(usersTable)
		.leftJoin(customerProfilesTable, eq(usersTable.id, customerProfilesTable.userId))
		.where(eq(usersTable.id, userId))
		.get(); // .get() is used for fetching a single record

	if (!userResult) {
		error(404, 'User not found');
	}

	const { users: user, customer_profiles: profile } = userResult;

	const cartItems = await db
		.select({
			printId: printsTable.id,
			printName: printsTable.name,
			printPriceCents: printsTable.priceCents,
			colorwayImageUrl:
				sql`(SELECT image_url FROM colorways WHERE print_id = ${printsTable.id} LIMIT 1)`.mapWith(
					String
				)
		})
		.from(cartItemsTable)
		.innerJoin(printsTable, eq(cartItemsTable.printId, printsTable.id))
		.where(eq(cartItemsTable.userId, userId));

	const subtotal = cartItems.reduce((total, item) => total + item.printPriceCents, 0);
	const vat = subtotal * 0.21;
	const total = subtotal + vat;

	const initialData = {
		firstName: user.firstName ?? '',
		lastName: user.lastName ?? '',
		email: user.email ?? '',
		companyName: profile?.companyName ?? '',
		mailInvoiceTo: profile?.invoiceEmail ?? '',
		vatNumber: profile?.vatNumber ?? '',
		streetAndNumber: profile?.streetAndNumber ?? '',
		streetAdditional: profile?.streetAdditional ?? '',
		postalCode: profile?.postalCode ?? '',
		city: profile?.city ?? '',
		country: profile?.country ?? 'NL',
		province: profile?.region ?? '',
		paymentMethod: 'ideal' as const,
		acceptTerms: false
	};

	const form = await superValidate(initialData, zod(checkoutSchema));

	return {
		form,
		cartItems,
		subtotal,
		vat,
		total,
		countries
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			error(401, 'Unauthorized');
		}

		const form = await superValidate(request, zod(checkoutSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const userId = locals.user.id;

		try {
			// Using a transaction to ensure all or nothing is written to the DB
			const newOrder = await db.transaction(async (tx) => {
				const cartItems = await tx
					.select({
						printId: printsTable.id,
						price: printsTable.priceCents
					})
					.from(cartItemsTable)
					.innerJoin(printsTable, eq(cartItemsTable.printId, printsTable.id))
					.where(eq(cartItemsTable.userId, userId));

				if (cartItems.length === 0) {
					return null;
				}

				const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
				const totalInEuros = (subtotal + subtotal * 0.21) / 100;

				const [order] = await tx
					.insert(ordersTable)
					.values({
						userId: userId,
						total: totalInEuros,
						status: 'pending'
					})
					.returning({ insertedId: ordersTable.id });

				const orderId = order.insertedId;

				if (!orderId) {
					tx.rollback();
					return null;
				}

				const orderItems = cartItems.map((item) => ({
					orderId: orderId,
					printId: item.printId,
					price: item.price / 100
				}));
				await tx.insert(orderItemsTable).values(orderItems);

				await tx.delete(cartItemsTable).where(eq(cartItemsTable.userId, userId));

				return { id: orderId };
			});

			if (!newOrder) {
				return fail(400, { form, message: 'Your cart is empty or an error occurred.' });
			}

			// --- MOLLIE INTEGRATION WOULD GO HERE ---
			// For now, redirecting to a success page
			redirect(303, `/account/orders/${newOrder.id}`);
		} catch (e) {
			console.error('Checkout error:', e);
			return fail(500, { form, message: 'An unexpected error occurred during checkout.' });
		}
	}
};
