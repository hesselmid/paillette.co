import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	printsTable,
	colorwaysTable,
	categoriesTable,
	printCategoriesTable,
	colorsTable,
	colorwayColorsTable,
	usersTable,
	wishlistItemsTable
} from '$lib/server/db/schema';
import { and, eq, inArray, desc, countDistinct } from 'drizzle-orm';
import type { Actions } from './$types';

const ITEMS_PER_PAGE = 12;

export const load = async ({ url, locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}
	const userId = locals.user.id;

	const allColorsPromise = db
		.select({ id: colorsTable.id, name: colorsTable.name })
		.from(colorsTable)
		.orderBy(colorsTable.name);

	const allCategoriesPromise = db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoriesTable)
		.orderBy(categoriesTable.name);

	const allDesignersPromise = db
		.select({
			id: usersTable.id,
			name: usersTable.firstName
		})
		.from(usersTable)
		.where(eq(usersTable.role, 'member'))
		.orderBy(usersTable.lastName, usersTable.firstName);

	const wishlistIdsPromise = db
		.select({ printId: wishlistItemsTable.printId })
		.from(wishlistItemsTable)
		.where(eq(wishlistItemsTable.userId, userId));

	const [allColors, allCategories, allDesigners, userWishlistItems] = await Promise.all([
		allColorsPromise,
		allCategoriesPromise,
		allDesignersPromise,
		wishlistIdsPromise
	]);

	const wishlistedPrintIds = new Set(userWishlistItems.map((item) => item.printId));

	const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
	const selectedColorIds = url.searchParams
		.getAll('colors')
		.map((id) => parseInt(id, 10))
		.filter((id) => !isNaN(id) && id > 0);
	const selectedCategoryIds = url.searchParams
		.getAll('categories')
		.map((id) => parseInt(id, 10))
		.filter((id) => !isNaN(id) && id > 0);
	const selectedDesignerIds = url.searchParams
		.getAll('designers')
		.map((id) => parseInt(id, 10))
		.filter((id) => !isNaN(id) && id > 0);

	const conditions = [eq(printsTable.isSold, false)];

	if (selectedColorIds.length > 0) {
		const colorSubQuery = db
			.selectDistinct({ id: colorwayColorsTable.colorwayId })
			.from(colorwayColorsTable)
			.where(inArray(colorwayColorsTable.colorId, selectedColorIds));
		conditions.push(inArray(colorwaysTable.id, colorSubQuery));
	}

	if (selectedCategoryIds.length > 0) {
		const categorySubQuery = db
			.selectDistinct({ id: printCategoriesTable.printId })
			.from(printCategoriesTable)
			.where(inArray(printCategoriesTable.categoryId, selectedCategoryIds));
		conditions.push(inArray(printsTable.id, categorySubQuery));
	}

	if (selectedDesignerIds.length > 0) {
		conditions.push(inArray(printsTable.designerId, selectedDesignerIds));
	}

	const combinedConditions = conditions.length > 0 ? and(...conditions) : undefined;

	const colorwaysDataPromise = db
		.select({
			id: colorwaysTable.id,
			name: colorwaysTable.name,
			imageUrl: colorwaysTable.imageUrl,
			printId: printsTable.id
		})
		.from(colorwaysTable)
		.innerJoin(printsTable, eq(colorwaysTable.printId, printsTable.id))
		.where(combinedConditions)
		.orderBy(desc(printsTable.createdAt), desc(colorwaysTable.id))
		.limit(ITEMS_PER_PAGE)
		.offset((page - 1) * ITEMS_PER_PAGE);

	const totalColorwaysPromise = db
		.select({ count: countDistinct(colorwaysTable.id) })
		.from(colorwaysTable)
		.innerJoin(printsTable, eq(colorwaysTable.printId, printsTable.id))
		.where(combinedConditions);

	const [colorwaysData, totalColorwaysResult] = await Promise.all([
		colorwaysDataPromise,
		totalColorwaysPromise
	]);

	const totalColorways = totalColorwaysResult[0]?.count || 0;
	const totalPages = Math.max(1, Math.ceil(totalColorways / ITEMS_PER_PAGE));
	const currentPage = Math.min(page, totalPages);

	return {
		colorways: colorwaysData,
		currentPage,
		totalPages,
		totalColorways,
		wishlistedPrintIds: Array.from(wishlistedPrintIds),
		filters: {
			allColors,
			allCategories,
			allDesigners,
			selectedColorIds,
			selectedCategoryIds,
			selectedDesignerIds
		},
		navColor: 'enoki',
		footerColor: 'enoki'
	};
};

export const actions = {
	addToWishlist: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}
		const userId = locals.user.id;
		const formData = await request.formData();
		const printIdStr = formData.get('printId');

		if (!printIdStr || typeof printIdStr !== 'string') {
			return fail(400, { message: 'Missing Print ID', failedPrintId: null });
		}

		const printId = parseInt(printIdStr, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID', failedPrintId: printIdStr });
		}

		try {
			const printExists = await db
				.select({ id: printsTable.id })
				.from(printsTable)
				.where(eq(printsTable.id, printId))
				.limit(1);
			if (!printExists.length) {
				return fail(404, { message: 'Print not found', failedPrintId: printId });
			}

			await db.insert(wishlistItemsTable).values({ userId, printId }).onConflictDoNothing();

			return { success: true, added: true, printId };
		} catch (e) {
			console.error(`Error adding print ${printId} to wishlist for user ${userId}:`, e);
			return fail(500, { message: 'Could not add to wishlist.', failedPrintId: printId });
		}
	},

	removeFromWishlist: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}
		const userId = locals.user.id;
		const formData = await request.formData();
		const printIdStr = formData.get('printId');

		if (!printIdStr || typeof printIdStr !== 'string') {
			return fail(400, { message: 'Missing Print ID', failedPrintId: null });
		}

		const printId = parseInt(printIdStr, 10);
		if (isNaN(printId)) {
			return fail(400, { message: 'Invalid Print ID', failedPrintId: printIdStr });
		}

		try {
			await db
				.delete(wishlistItemsTable)
				.where(and(eq(wishlistItemsTable.userId, userId), eq(wishlistItemsTable.printId, printId)));

			return { success: true, removed: true, printId };
		} catch (e) {
			console.error(`Error removing print ${printId} from wishlist for user ${userId}:`, e);
			return fail(500, { message: 'Could not remove from wishlist.', failedPrintId: printId });
		}
	}
} satisfies Actions;
