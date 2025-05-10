import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const printsTable = sqliteTable('prints', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	priceCents: integer('price_cents').notNull(),
	designerId: integer('designer_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'restrict' }),
	isSold: integer('is_sold', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});

export const colorwaysTable = sqliteTable('colorways', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	printId: integer('print_id')
		.notNull()
		.references(() => printsTable.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	imageUrl: text('image_url'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});
