// src/routes/shop/[printId]/+page.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	printsTable,
	colorwaysTable,
	usersTable,
	wishlistItemsTable // ADDED
} from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

// Helper function to format price
function formatPrice(cents: number): string {
	const euros = cents / 100;
	return new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(euros);
}

export const load: PageServerLoad = async ({ params, locals, url }) => {
	// Authorization Check
	if (!locals.user || locals.user.role !== 'customer') {
		// Consider redirecting to login if preferred
		const redirectTo = `redirectTo=${encodeURIComponent(url.pathname)}`;
		redirect(303, `/login?${redirectTo}`);
		// error(403, 'Forbidden: You must be logged in as a customer to view prints.');
	}

	const printIdParam = params.printId;
	const printId = parseInt(printIdParam, 10);

	if (isNaN(printId) || printId <= 0) {
		error(400, 'Invalid Print ID');
	}

	const userId = locals.user.id; // Get user ID

	try {
		// Fetch print details along with the designer's name and all colorways
		const resultsPromise = db
			.select({
				// Print details
				printId: printsTable.id,
				printName: printsTable.name,
				printDescription: printsTable.description,
				printPriceCents: printsTable.priceCents,
				printIsSold: printsTable.isSold,
				printCreatedAt: printsTable.createdAt,
				// Designer details
				designerId: usersTable.id,
				designerFirstName: usersTable.firstName,
				designerLastName: usersTable.lastName,
				// Colorway details
				colorwayId: colorwaysTable.id,
				colorwayName: colorwaysTable.name,
				colorwayImageUrl: colorwaysTable.imageUrl
			})
			.from(printsTable)
			.innerJoin(usersTable, eq(printsTable.designerId, usersTable.id))
			.leftJoin(colorwaysTable, eq(printsTable.id, colorwaysTable.printId))
			.where(eq(printsTable.id, printId));

		// Check if item is in wishlist
		let isInWishlist = false;
		const wishlistCheckPromise = db
			.select({ printId: wishlistItemsTable.printId })
			.from(wishlistItemsTable)
			.where(and(eq(wishlistItemsTable.userId, userId), eq(wishlistItemsTable.printId, printId)))
			.limit(1);

		// Resolve promises
		const [results, wishlistCheck] = await Promise.all([resultsPromise, wishlistCheckPromise]);

		if (results.length === 0) {
			error(404, 'Print not found');
		}

		// Set wishlist status
		if (wishlistCheck.length > 0) {
			isInWishlist = true;
		}

		// Process the results: Extract unique print info and aggregate colorways
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

		// Basic deduplication
		const uniqueColorways = Array.from(new Map(colorways.map((cw) => [cw.id, cw])).values());

		return {
			print: printDetails,
			colorways: uniqueColorways,
			isInWishlist // Pass wishlist status to the page
		};
	} catch (e) {
		console.error(`Error fetching print details for ID ${printId}:`, e);
		error(500, 'Failed to load print details.');
	}
};

// Actions for Wishlist on Detail Page
export const actions: Actions = {
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
			// Check if print exists (optional but good practice)
			const printExists = await db
				.select({ id: printsTable.id })
				.from(printsTable)
				.where(eq(printsTable.id, printId))
				.limit(1);
			if (!printExists.length) {
				return fail(404, { message: 'Print not found' });
			}

			// Use INSERT OR IGNORE
			await db.insert(wishlistItemsTable).values({ userId, printId }).onConflictDoNothing();

			return { success: true, added: true }; // Indicate success
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

			return { success: true, removed: true }; // Indicate success
		} catch (e) {
			console.error(`Error removing print ${printId} from wishlist for user ${userId}:`, e);
			return fail(500, { message: 'Could not remove from wishlist.' });
		}
	}
};
