import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { wishlistItemsTable, printsTable, colorwaysTable, usersTable } from '$lib/server/db/schema';
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
		// Fetch wishlist items joined with print and designer details.
		// Fetch the *first* colorway image for display using a subquery.
		const firstColorwaySubquery = db.$with('first_colorway').as(
			db
				.select({
					printId: colorwaysTable.printId,
					// Using MIN as a simple aggregate to pick one URL. Adjust if specific logic is needed (e.g., lowest ID).
					imageUrl: sql<string>`min(${colorwaysTable.imageUrl})`.as('imageUrl')
				})
				.from(colorwaysTable)
				.where(sql`${colorwaysTable.imageUrl} IS NOT NULL`) // Ensure we only consider colorways with images
				.groupBy(colorwaysTable.printId)
		);

		const wishlist = await db
			.with(firstColorwaySubquery)
			.select({
				printId: printsTable.id,
				printName: printsTable.name,
				printPriceCents: printsTable.priceCents,
				printIsSold: printsTable.isSold, // Include to potentially grey out sold items
				designerFirstName: usersTable.firstName,
				designerLastName: usersTable.lastName,
				colorwayImageUrl: firstColorwaySubquery.imageUrl // Get the pre-selected image
			})
			.from(wishlistItemsTable)
			.innerJoin(printsTable, eq(wishlistItemsTable.printId, printsTable.id))
			.innerJoin(usersTable, eq(printsTable.designerId, usersTable.id))
			.leftJoin(
				// Left join in case a print in wishlist has NO colorways with images
				firstColorwaySubquery,
				eq(printsTable.id, firstColorwaySubquery.printId)
			)
			.where(eq(wishlistItemsTable.userId, userId))
			.orderBy(desc(wishlistItemsTable.createdAt));

		const formattedWishlist = wishlist.map((item) => ({
			printId: item.printId,
			printName: item.printName,
			priceFormatted: formatPrice(item.printPriceCents),
			isSold: item.printIsSold,
			designerFullName: `${item.designerFirstName} ${item.designerLastName}`,
			imageUrl: item.colorwayImageUrl
		}));

		return {
			wishlistItems: formattedWishlist
		};
	} catch (e) {
		console.error(`Error fetching wishlist for user ID ${userId}:`, e);
		error(500, 'Failed to load your wishlist.');
	}
};

export const actions = {
	remove: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const printIdStr = formData.get('printId');

		if (!printIdStr || typeof printIdStr !== 'string') {
			return fail(400, { message: 'Missing Print ID' });
		}

		const printId = parseInt(printIdStr, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID' });
		}

		const userId = locals.user.id;

		try {
			const result = await db
				.delete(wishlistItemsTable)
				.where(and(eq(wishlistItemsTable.userId, userId), eq(wishlistItemsTable.printId, printId)))
				.returning({ id: wishlistItemsTable.printId });

			if (result.length === 0) {
				return fail(404, { message: 'Item not found in wishlist.' });
			}

			return { success: true };
		} catch (e) {
			console.error(`Error removing print ID ${printId} from wishlist for user ID ${userId}:`, e);
			return fail(500, { message: 'Failed to remove item from wishlist.' });
		}
	}
} satisfies Actions;
