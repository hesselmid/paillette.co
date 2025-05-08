import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const USER_ROLES = ['member', 'customer', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	role: text('role', { enum: USER_ROLES }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});

export const otpsTable = sqliteTable('otps', {
	id: integer('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	code: text('code').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
});

export const memberProfilesTable = sqliteTable('member_profiles', {
	userId: integer('user_id')
		.primaryKey()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	iban: text('iban'),
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
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as integer) * 1000)`)
		.$onUpdate(() => new Date())
});
