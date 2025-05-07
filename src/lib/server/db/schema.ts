import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const USER_ROLES = ['member', 'customer', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').notNull().unique(),
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

export const usersRelations = relations(usersTable, ({ many }) => ({
	otps: many(otpsTable),
	sessions: many(sessionsTable)
}));

export const otpsRelations = relations(otpsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [otpsTable.userId],
		references: [usersTable.id]
	})
}));

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id]
	})
}));
