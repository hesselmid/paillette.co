import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const ORDER_STATUSES = ['pending', 'paid', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ordersTable = sqliteTable('orders', {
	id: integer('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	status: text('status').$type<OrderStatus>().notNull().default('pending'),
	total: real('total').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
});
