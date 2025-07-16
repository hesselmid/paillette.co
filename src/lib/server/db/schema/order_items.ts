import { sqliteTable, integer, primaryKey, real } from 'drizzle-orm/sqlite-core';
import { ordersTable } from './orders';
import { printsTable } from './prints';

export const orderItemsTable = sqliteTable(
	'order_items',
	{
		orderId: integer('order_id')
			.notNull()
			.references(() => ordersTable.id, { onDelete: 'cascade' }),
		printId: integer('print_id')
			.notNull()
			.references(() => printsTable.id, { onDelete: 'cascade' }),
		price: real('price').notNull() // Price at the time of purchase
	},
	(table) => ({
		pk: primaryKey({ columns: [table.orderId, table.printId] })
	})
);
