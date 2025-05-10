import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { colorwaysTable } from './prints';

export const colorsTable = sqliteTable('colors', {
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

export const colorwayColorsTable = sqliteTable(
	'colorway_colors',
	{
		colorwayId: integer('colorway_id')
			.notNull()
			.references(() => colorwaysTable.id, { onDelete: 'cascade' }),
		colorId: integer('color_id')
			.notNull()
			.references(() => colorsTable.id, { onDelete: 'cascade' })
	},
	(table) => {
		return [primaryKey({ columns: [table.colorwayId, table.colorId] })];
	}
);
