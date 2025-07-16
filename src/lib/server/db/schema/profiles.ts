import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

const addressFields = {
	streetAndNumber: text('street_and_number'),
	streetAdditional: text('street_additional'),
	postalCode: text('postal_code'),
	city: text('city'),
	region: text('region'),
	country: text('country')
};

export const memberProfilesTable = sqliteTable('member_profiles', {
	userId: integer('user_id')
		.primaryKey()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	iban: text('iban'),
	...addressFields,
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});

export const customerProfilesTable = sqliteTable('customer_profiles', {
	userId: integer('user_id')
		.primaryKey()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	companyName: text('company_name'),
	invoiceEmail: text('invoice_email'),
	vatNumber: text('vat_number'),
	...addressFields,
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});
