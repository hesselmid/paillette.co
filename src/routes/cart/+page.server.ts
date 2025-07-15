// src/routes/cart/+page.server.ts
import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { cartItemsTable, printsTable, colorwaysTable, usersTable } from '$lib/server/db/schema';
import { and, eq, desc, sql } from 'drizzle-orm';
import type { Actions } from './$types';

function formatPrice(cents: number): string {
	const euros = cents / 100;
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR'
	}).format(euros);
}

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}
	const userId = locals.user.id;

	try {
		const firstColorwaySubquery = db.$with('first_colorway').as(
			db
				.select({
					printId: colorwaysTable.printId,
					imageUrl: sql<string>`min(${colorwaysTable.imageUrl})`.as('imageUrl')
				})
				.from(colorwaysTable)
				.where(sql`${colorwaysTable.imageUrl} IS NOT NULL`)
				.groupBy(colorwaysTable.printId)
		);

		const cartData = await db
			.with(firstColorwaySubquery)
			.select({
				printId: printsTable.id,
				printName: printsTable.name,
				printPriceCents: printsTable.priceCents,
				designerFirstName: usersTable.firstName,
				designerLastName: usersTable.lastName,
				colorwayImageUrl: firstColorwaySubquery.imageUrl
			})
			.from(cartItemsTable)
			.innerJoin(printsTable, eq(cartItemsTable.printId, printsTable.id))
			.innerJoin(usersTable, eq(printsTable.designerId, usersTable.id))
			.leftJoin(firstColorwaySubquery, eq(printsTable.id, firstColorwaySubquery.printId))
			.where(eq(cartItemsTable.userId, userId))
			.orderBy(desc(cartItemsTable.createdAt));

		const formattedCart = cartData.map((item) => ({
			...item,
			priceFormatted: formatPrice(item.printPriceCents)
		}));

		return {
			cartItems: formattedCart,
			footerColor: 'white'
		};
	} catch (e) {
		console.error(`Error fetching cart for user ID ${userId}:`, e);
		error(500, 'Failed to load your cart.');
	}
};

export const actions: Actions = {
	remove: async ({ request, locals }) => {
		if (!locals.user) return fail(403, { message: 'Forbidden' });
		const userId = locals.user.id;
		const formData = await request.formData();
		const printId = parseInt(formData.get('printId') as string, 10);

		if (isNaN(printId)) return fail(400, { message: 'Invalid Print ID' });

		// Fetch item details before deleting to return for "undo" feature
		const itemToRemove = await db
			.select({ printName: printsTable.name, printId: printsTable.id })
			.from(cartItemsTable)
			.innerJoin(printsTable, eq(cartItemsTable.printId, printsTable.id))
			.where(and(eq(cartItemsTable.userId, userId), eq(cartItemsTable.printId, printId)))
			.limit(1);

		if (!itemToRemove.length) return fail(404, { message: 'Item not in cart' });

		await db
			.delete(cartItemsTable)
			.where(and(eq(cartItemsTable.userId, userId), eq(cartItemsTable.printId, printId)));

		return { removedItem: itemToRemove[0] };
	},

	undoRemove: async ({ request, locals }) => {
		if (!locals.user) return fail(403, { message: 'Forbidden' });
		const userId = locals.user.id;
		const formData = await request.formData();
		const printId = parseInt(formData.get('printId') as string, 10);

		if (isNaN(printId)) return fail(400, { message: 'Invalid Print ID' });

		await db.insert(cartItemsTable).values({ userId, printId }).onConflictDoNothing();

		return { undone: true };
	}
};
