import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { printsTable } from './prints';

export const categoriesTable = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});

export const printCategoriesTable = sqliteTable(
	'print_categories',
	{
		printId: integer('print_id')
			.notNull()
			.references(() => printsTable.id, { onDelete: 'cascade' }),
		categoryId: integer('category_id')
			.notNull()
			.references(() => categoriesTable.id, { onDelete: 'cascade' })
	},
	(table) => {
		return [primaryKey({ columns: [table.printId, table.categoryId] })];
	}
);
