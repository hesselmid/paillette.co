import { redirect } from '@sveltejs/kit';
import { deleteSession, SESSION_COOKIE_NAME } from '$lib/server/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get(SESSION_COOKIE_NAME);

	if (sessionId) {
		await deleteSession(sessionId, cookies);
	}

	redirect(303, '/login');
};
