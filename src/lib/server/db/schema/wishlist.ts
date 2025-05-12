import { sql } from 'drizzle-orm';
import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
import { printsTable } from './prints';

export const wishlistItemsTable = sqliteTable(
	'wishlist_items',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		printId: integer('print_id')
			.notNull()
			.references(() => printsTable.id, { onDelete: 'cascade' }),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
	},
	(table) => {
		return [primaryKey({ columns: [table.userId, table.printId] })];
	}
);
