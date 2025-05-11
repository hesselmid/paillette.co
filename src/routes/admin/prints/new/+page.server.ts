import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import {
	usersTable,
	categoriesTable,
	colorsTable,
	printsTable,
	printCategoriesTable,
	colorwaysTable,
	colorwayColorsTable
} from '$lib/server/db/schema';
import { z } from 'zod';
import { eq, sql } from 'drizzle-orm';
import type { Actions } from './$types';

// Define the Zod schema for a single colorway.
const colorwaySchema = z.object({
	// Colorway name is required and must be at least 1 character.
	name: z.string().min(1, 'Colorway name is required.'),
	// Image URL is optional, must be a valid URL if provided, or an empty string.
	imageUrl: z.string().url({ message: 'Invalid URL format.' }).optional().or(z.literal('')),
	// Color IDs must be an array of positive integers, with at least one color selected.
	// `coerce.number()` attempts to convert string values from form (if not using dataType: 'json') to numbers.
	colorIds: z
		.array(z.coerce.number().int().positive())
		.min(1, 'At least one color must be selected for a colorway.')
});

// Define the Zod schema for the new print form, including an array of colorways.
const newPrintSchema = z.object({
	// Print name is required.
	printName: z.string().min(1, 'Print name is required.'),
	// Description is optional.
	description: z.string().optional(),
	// Price in cents must be a non-negative integer.
	priceCents: z.coerce.number().int().min(0, 'Price must be a non-negative integer.'),
	// Designer ID must be a positive integer.
	designerId: z.coerce.number().int().positive('A designer must be selected.'),
	// Category IDs must be an array of positive integers, with at least one category selected.
	categoryIds: z
		.array(z.coerce.number().int().positive())
		.min(1, 'At least one category must be selected.'),
	// Colorways must be an array of colorwaySchema objects, with at least one colorway.
	colorways: z.array(colorwaySchema).min(1, 'At least one colorway is required.')
});

// The `load` function runs on the server before the page is rendered.
// It's used to fetch data needed for the page and to initialize the form.
export const load = async ({ locals }) => {
	// Check if the user is logged in and is an admin.
	if (!locals.user || locals.user.role !== 'admin') {
		// If not, throw a 403 Forbidden error.
		error(403, 'Forbidden: You do not have access to this page.');
	}

	// Start fetching data for designers, categories, and colors in parallel.
	// Fetch users with the 'member' role (designers), concatenating first and last names.
	const designersPromise = db
		.select({
			id: usersTable.id,
			name: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`
		})
		.from(usersTable)
		.where(eq(usersTable.role, 'member'))
		.orderBy(usersTable.lastName, usersTable.firstName);

	// Fetch all categories.
	const categoriesPromise = db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoriesTable)
		.orderBy(categoriesTable.name);
	// Fetch all colors.
	const colorsPromise = db
		.select({ id: colorsTable.id, name: colorsTable.name })
		.from(colorsTable)
		.orderBy(colorsTable.name);

	// Wait for all promises to resolve.
	const [designers, allCategories, allColors] = await Promise.all([
		designersPromise,
		categoriesPromise,
		colorsPromise
	]);

	// Initialize an empty Superform instance with the Zod schema.
	const form = await superValidate(zod(newPrintSchema));

	// Return the form instance and the fetched data to the page component.
	return {
		form,
		designers,
		allCategories,
		allColors
	};
};

// Define the form actions for this page.
export const actions: Actions = {
	// The 'default' action is called when the form is submitted without a specific action name.
	default: async ({ request, locals }) => {
		// Check if the user is logged in and is an admin.
		if (!locals.user || locals.user.role !== 'admin') {
			// If not, throw a 403 Forbidden error.
			error(403, 'Forbidden');
		}

		// Validate the incoming form data against the Zod schema using Superforms.
		// `request` contains the form data.
		const form = await superValidate(request, zod(newPrintSchema));

		// If the form data is invalid according to the schema.
		if (!form.valid) {
			// Return a 400 Bad Request status with the form object (containing errors and data).
			return fail(400, { form });
		}

		// Try to insert the data into the database.
		try {
			// Use a database transaction to ensure all inserts succeed or fail together (atomicity).
			await db.transaction(async (tx) => {
				// 1. Insert the main print record into the 'printsTable'.
				const [newPrint] = await tx
					.insert(printsTable)
					.values({
						name: form.data.printName,
						description: form.data.description,
						priceCents: form.data.priceCents,
						designerId: form.data.designerId,
						isSold: false // New prints are not sold by default.
					})
					// Return the ID of the newly inserted print.
					.returning({ id: printsTable.id });

				// If print creation failed or no ID was returned, throw an error.
				if (!newPrint || !newPrint.id) {
					throw new Error('Failed to create print.');
				}
				const printId = newPrint.id;

				// 2. Link the new print to its selected categories in the 'printCategoriesTable'.
				// Map selected category IDs to the format needed for insertion.
				const printCategoryValues = form.data.categoryIds.map((categoryId) => ({
					printId: printId,
					categoryId: categoryId
				}));
				// If there are categories to link, insert them.
				if (printCategoryValues.length > 0) {
					await tx.insert(printCategoriesTable).values(printCategoryValues);
				}

				// 3. Insert each colorway and link its colors.
				for (const colorwayData of form.data.colorways) {
					// Insert the colorway record into 'colorwaysTable'.
					const [newColorway] = await tx
						.insert(colorwaysTable)
						.values({
							printId: printId,
							name: colorwayData.name,
							// Use null for imageUrl if it's an empty string or undefined.
							imageUrl: colorwayData.imageUrl || null
						})
						// Return the ID of the newly inserted colorway.
						.returning({ id: colorwaysTable.id });

					// If colorway creation failed or no ID was returned, throw an error.
					if (!newColorway || !newColorway.id) {
						throw new Error(`Failed to create colorway: ${colorwayData.name}`);
					}
					const colorwayId = newColorway.id;

					// Link the new colorway to its selected colors in 'colorwayColorsTable'.
					// Map selected color IDs for this colorway.
					const colorwayColorValues = colorwayData.colorIds.map((colorId) => ({
						colorwayId: colorwayId,
						colorId: colorId
					}));

					// If there are colors to link for this colorway, insert them.
					if (colorwayColorValues.length > 0) {
						await tx.insert(colorwayColorsTable).values(colorwayColorValues);
					}
				}
			});
		} catch (e: unknown) {
			// Catch any errors during the transaction.
			// Log the error to the server console.
			console.error('Error creating print:', e);
			// Prepare an error message.
			let errorMessage = 'Unknown error';
			if (e instanceof Error) {
				errorMessage = e.message;
			}
			// Return a 500 Internal Server Error status with an error message to the client.
			return message(form, `Failed to create print: ${errorMessage}`, { status: 500 });
		}
		// If the transaction is successful, redirect the admin to the dashboard.
		redirect(303, '/admin/dashboard');
	}
};
