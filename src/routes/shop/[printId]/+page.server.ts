// src/routes/shop/[printId]/+page.server.ts
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	printsTable,
	colorwaysTable,
	usersTable
	// Import others like categoriesTable, colorsTable if needed for display later
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

// Helper function to format price
function formatPrice(cents: number): string {
	const euros = cents / 100;
	return new Intl.NumberFormat('de-DE', {
		// Using de-DE for comma decimal separator, adjust as needed
		style: 'currency',
		currency: 'EUR'
	}).format(euros);
}

export const load: PageServerLoad = async ({ params, locals }) => {
	// Authorization Check (redundant if hook works, but good for safety)
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden: You must be logged in as a customer to view prints.');
	}

	const printIdParam = params.printId;
	const printId = parseInt(printIdParam, 10);

	if (isNaN(printId) || printId <= 0) {
		error(400, 'Invalid Print ID');
	}

	try {
		// Fetch the print details along with the designer's name and all colorways
		// Drizzle returns one row per colorway joined with the print.
		const results = await db
			.select({
				// Print details
				printId: printsTable.id,
				printName: printsTable.name,
				printDescription: printsTable.description,
				printPriceCents: printsTable.priceCents,
				printIsSold: printsTable.isSold, // Good to know, maybe disable purchase later
				printCreatedAt: printsTable.createdAt,
				// Designer details
				designerId: usersTable.id,
				designerFirstName: usersTable.firstName,
				designerLastName: usersTable.lastName,
				// Colorway details (will be one per row)
				colorwayId: colorwaysTable.id,
				colorwayName: colorwaysTable.name,
				colorwayImageUrl: colorwaysTable.imageUrl
			})
			.from(printsTable)
			.innerJoin(usersTable, eq(printsTable.designerId, usersTable.id))
			.leftJoin(colorwaysTable, eq(printsTable.id, colorwaysTable.printId)) // Use leftJoin in case a print has 0 colorways (though unlikely)
			.where(eq(printsTable.id, printId));

		if (results.length === 0) {
			error(404, 'Print not found');
		}

		// Process the results: Extract unique print info and aggregate colorways
		const firstResult = results[0];
		const printDetails = {
			id: firstResult.printId,
			name: firstResult.printName,
			description: firstResult.printDescription,
			priceFormatted: formatPrice(firstResult.printPriceCents),
			priceCents: firstResult.printPriceCents, // Keep original if needed for logic
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
			.filter((cw): cw is { id: number; name: string; imageUrl: string | null } => cw.id !== null); // Filter out nulls if leftJoin resulted in no match

		// Basic deduplication in case of odd data, though `select` should handle it.
		const uniqueColorways = Array.from(new Map(colorways.map((cw) => [cw.id, cw])).values());

		return {
			print: printDetails,
			colorways: uniqueColorways
		};
	} catch (e) {
		console.error(`Error fetching print details for ID ${printId}:`, e);
		error(500, 'Failed to load print details.');
	}
};
