import { error, fail } from '@sveltejs/kit';
import { lt } from 'drizzle-orm';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { sessionsTable } from '$lib/server/db/schema';

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Forbidden');
	}

	return {
		currentUser: {
			firstName: locals.user.firstName
		}
	};
};

export const actions = {
	cleanupSessions: async ({ locals }) => {
		if (!locals.user || locals.user.role !== 'admin') {
			return fail(403, { message: 'Forbidden' });
		}

		const now = new Date();
		try {
			const result = await db
				.delete(sessionsTable)
				.where(lt(sessionsTable.expiresAt, now))
				.returning({ id: sessionsTable.id });

			return {
				success: true,
				message: `Successfully deleted ${result.length} expired sessions.`
			};
		} catch (e) {
			console.error('Error cleaning up expired sessions:', e);
			return fail(500, {
				message: 'Failed to clean up sessions. Please check server logs.'
			});
		}
	}
} satisfies Actions;
