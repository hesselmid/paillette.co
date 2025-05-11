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

const colorwaySchema = z.object({
	name: z.string().min(1, 'Colorway name is required.'),
	imageUrl: z.string().url({ message: 'Invalid URL format.' }).optional().or(z.literal('')),
	colorIds: z
		.array(z.coerce.number().int().positive())
		.min(1, 'At least one color must be selected for a colorway.')
});

const newPrintSchema = z.object({
	printName: z.string().min(1, 'Print name is required.'),
	description: z.string().optional(),
	priceCents: z
		.string()
		.min(1, { message: 'Price is required.' })
		.regex(/^\d+([.,]\d{1,2})?$/, {
			message:
				'Invalid price format. Use numbers, optionally with a dot or comma and up to two decimal places (e.g., 19.99 or 19,99).'
		})
		.transform((valStr) => Math.round(parseFloat(valStr.replace(',', '.')) * 100))
		.refine((valNum) => valNum >= 0, {
			message: 'Price must be a non-negative value.'
		}),
	designerId: z.coerce.number().int().positive('A designer must be selected.'),
	categoryIds: z
		.array(z.coerce.number().int().positive())
		.min(1, 'At least one category must be selected.'),
	colorways: z.array(colorwaySchema).min(1, 'At least one colorway is required.')
});

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Forbidden: You do not have access to this page.');
	}

	const designersPromise = db
		.select({
			id: usersTable.id,
			name: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`
		})
		.from(usersTable)
		.where(eq(usersTable.role, 'member'))
		.orderBy(usersTable.lastName, usersTable.firstName);

	const categoriesPromise = db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoriesTable)
		.orderBy(categoriesTable.name);
	const colorsPromise = db
		.select({ id: colorsTable.id, name: colorsTable.name })
		.from(colorsTable)
		.orderBy(colorsTable.name);

	const [designers, allCategories, allColors] = await Promise.all([
		designersPromise,
		categoriesPromise,
		colorsPromise
	]);

	const form = await superValidate(zod(newPrintSchema));

	return {
		form,
		designers,
		allCategories,
		allColors
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'admin') {
			error(403, 'Forbidden');
		}

		const form = await superValidate(request, zod(newPrintSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.transaction(async (tx) => {
				const [newPrint] = await tx
					.insert(printsTable)
					.values({
						name: form.data.printName,
						description: form.data.description,
						priceCents: form.data.priceCents,
						designerId: form.data.designerId,
						isSold: false
					})
					.returning({ id: printsTable.id });

				if (!newPrint || !newPrint.id) {
					throw new Error('Failed to create print.');
				}
				const printId = newPrint.id;

				const printCategoryValues = form.data.categoryIds.map((categoryId) => ({
					printId: printId,
					categoryId: categoryId
				}));
				if (printCategoryValues.length > 0) {
					await tx.insert(printCategoriesTable).values(printCategoryValues);
				}

				for (const colorwayData of form.data.colorways) {
					const [newColorway] = await tx
						.insert(colorwaysTable)
						.values({
							printId: printId,
							name: colorwayData.name,
							imageUrl: colorwayData.imageUrl || null
						})
						.returning({ id: colorwaysTable.id });

					if (!newColorway || !newColorway.id) {
						throw new Error(`Failed to create colorway: ${colorwayData.name}`);
					}
					const colorwayId = newColorway.id;
					const colorwayColorValues = colorwayData.colorIds.map((colorId) => ({
						colorwayId: colorwayId,
						colorId: colorId
					}));

					if (colorwayColorValues.length > 0) {
						await tx.insert(colorwayColorsTable).values(colorwayColorValues);
					}
				}
			});
		} catch (e: unknown) {
			console.error('Error creating print:', e);
			let errorMessage = 'Unknown error';
			if (e instanceof Error) {
				errorMessage = e.message;
			}
			return message(form, `Failed to create print: ${errorMessage}`, { status: 500 });
		}
		redirect(303, '/admin/dashboard');
	}
} satisfies Actions;
