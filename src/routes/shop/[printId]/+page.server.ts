import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	printsTable,
	colorwaysTable,
	usersTable,
	wishlistItemsTable,
	cartItemsTable
} from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { Actions } from './$types';

function formatPrice(cents: number): string {
	const euros = cents / 100;
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR'
	}).format(euros);
}

export const load = async ({ params, locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}

	const printIdParam = params.printId;
	const printId = parseInt(printIdParam, 10);

	if (isNaN(printId) || printId <= 0) {
		error(400, 'Invalid Print ID');
	}

	const userId = locals.user.id;

	try {
		const resultsPromise = db
			.select({
				printId: printsTable.id,
				printName: printsTable.name,
				printDescription: printsTable.description,
				printPriceCents: printsTable.priceCents,
				printIsSold: printsTable.isSold,
				printCreatedAt: printsTable.createdAt,
				designerId: usersTable.id,
				designerFirstName: usersTable.firstName,
				designerLastName: usersTable.lastName,
				colorwayId: colorwaysTable.id,
				colorwayName: colorwaysTable.name,
				colorwayImageUrl: colorwaysTable.imageUrl
			})
			.from(printsTable)
			.innerJoin(usersTable, eq(printsTable.designerId, usersTable.id))
			.leftJoin(colorwaysTable, eq(printsTable.id, colorwaysTable.printId))
			.where(eq(printsTable.id, printId));

		let isInWishlist = false;
		const wishlistCheckPromise = db
			.select({ printId: wishlistItemsTable.printId })
			.from(wishlistItemsTable)
			.where(and(eq(wishlistItemsTable.userId, userId), eq(wishlistItemsTable.printId, printId)))
			.limit(1);

		let isInCart = false;
		const cartCheckPromise = db
			.select({ printId: cartItemsTable.printId })
			.from(cartItemsTable)
			.where(and(eq(cartItemsTable.userId, userId), eq(cartItemsTable.printId, printId)))
			.limit(1);

		const [results, wishlistCheck, cartCheck] = await Promise.all([
			resultsPromise,
			wishlistCheckPromise,
			cartCheckPromise
		]);

		if (results.length === 0) {
			error(404, 'Print not found');
		}

		if (wishlistCheck.length > 0) {
			isInWishlist = true;
		}

		if (cartCheck.length > 0) {
			isInCart = true;
		}

		const firstResult = results[0];
		const printDetails = {
			id: firstResult.printId,
			name: firstResult.printName,
			description: firstResult.printDescription,
			priceFormatted: formatPrice(firstResult.printPriceCents),
			priceCents: firstResult.printPriceCents,
			isSold: firstResult.printIsSold,
			createdAt: firstResult.printCreatedAt,
			designer: {
				id: firstResult.designerId,
				fullName: `${firstResult.designerFirstName} ${firstResult.designerLastName}`
			}
		};

		const colorways = results
			.map((row) => ({
				id: row.colorwayId,
				name: row.colorwayName,
				imageUrl: row.colorwayImageUrl
			}))
			.filter((cw): cw is { id: number; name: string; imageUrl: string | null } => cw.id !== null);

		const uniqueColorways = Array.from(new Map(colorways.map((cw) => [cw.id, cw])).values());

		return {
			print: printDetails,
			colorways: uniqueColorways,
			isInWishlist,
			isInCart,
			footerColor: 'white'
		};
	} catch (e) {
		console.error(`Error fetching print details for ID ${printId}:`, e);
		error(500, 'Failed to load print details.');
	}
};

export const actions = {
	addToWishlist: async ({ params, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}
		const printId = parseInt(params.printId, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID' });
		}
		const userId = locals.user.id;

		try {
			const printExists = await db
				.select({ id: printsTable.id })
				.from(printsTable)
				.where(eq(printsTable.id, printId))
				.limit(1);
			if (!printExists.length) {
				return fail(404, { message: 'Print not found' });
			}

			await db.insert(wishlistItemsTable).values({ userId, printId }).onConflictDoNothing();

			return { success: true, added: true };
		} catch (e) {
			console.error(`Error adding print ${printId} to wishlist for user ${userId}:`, e);
			return fail(500, { message: 'Could not add to wishlist.' });
		}
	},

	removeFromWishlist: async ({ params, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}
		const printId = parseInt(params.printId, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID' });
		}
		const userId = locals.user.id;

		try {
			await db
				.delete(wishlistItemsTable)
				.where(and(eq(wishlistItemsTable.userId, userId), eq(wishlistItemsTable.printId, printId)));

			return { success: true, removed: true };
		} catch (e) {
			console.error(`Error removing print ${printId} from wishlist for user ${userId}:`, e);
			return fail(500, { message: 'Could not remove from wishlist.' });
		}
	},

	addToCart: async ({ params, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}
		const printId = parseInt(params.printId, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID' });
		}
		const userId = locals.user.id;

		try {
			const printExists = await db
				.select({ id: printsTable.id, isSold: printsTable.isSold })
				.from(printsTable)
				.where(eq(printsTable.id, printId))
				.limit(1);

			if (!printExists.length) {
				return fail(404, { message: 'Print not found' });
			}
			if (printExists[0].isSold) {
				return fail(400, { message: 'This print is already sold.' });
			}

			await db.insert(cartItemsTable).values({ userId, printId }).onConflictDoNothing();

			return { success: true, addedToCart: true };
		} catch (e) {
			console.error(`Error adding print ${printId} to cart for user ${userId}:`, e);
			return fail(500, { message: 'Could not add to cart.' });
		}
	}
} satisfies Actions;
