import { db } from './db';
import { sessionsTable, usersTable, type UserRole } from './db/schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';
import type { Cookies } from '@sveltejs/kit';

export const SESSION_COOKIE_NAME = 'session_id';
const SESSION_DURATION_DAYS = 30;

export async function createSession(userId: number, cookies: Cookies): Promise<string> {
	const sessionId = crypto.randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);

	await db.insert(sessionsTable).values({
		id: sessionId,
		userId,
		expiresAt
	});

	cookies.set(SESSION_COOKIE_NAME, sessionId, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		expires: expiresAt
	});

	return sessionId;
}

export async function getSessionUser(sessionId: string | undefined) {
	if (!sessionId) {
		return null;
	}

	const now = new Date();
	const result = await db
		.select({
			id: usersTable.id,
			email: usersTable.email,
			role: usersTable.role
		})
		.from(sessionsTable)
		.innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
		.where(and(eq(sessionsTable.id, sessionId), gt(sessionsTable.expiresAt, now)))
		.limit(1);

	if (result.length > 0) {
		return {
			id: result[0].id,
			email: result[0].email,
			role: result[0].role as UserRole
		};
	}
	return null;
}

export async function deleteSession(sessionId: string, cookies: Cookies) {
	await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
	cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}
