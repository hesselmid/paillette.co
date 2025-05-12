// src/routes/shop/+page.server.ts
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	printsTable,
	colorwaysTable,
	categoriesTable,
	printCategoriesTable,
	colorsTable,
	colorwayColorsTable,
	usersTable
} from '$lib/server/db/schema';
import { and, eq, inArray, sql, desc, countDistinct } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

const ITEMS_PER_PAGE = 12;

export const load: PageServerLoad = async ({ url, locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}

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
			name: sql<string>`${usersTable.firstName} || ' ' || ${usersTable.lastName}`
		})
		.from(usersTable)
		.where(eq(usersTable.role, 'member'))
		.orderBy(usersTable.lastName, usersTable.firstName);

	const [allColors, allCategories, allDesigners] = await Promise.all([
		allColorsPromise,
		allCategoriesPromise,
		allDesignersPromise
	]);

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
			// printName: printsTable.name, // Optional: if you want to display print name too
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
		filters: {
			allColors,
			allCategories,
			allDesigners,
			selectedColorIds,
			selectedCategoryIds,
			selectedDesignerIds
		}
	};
};
