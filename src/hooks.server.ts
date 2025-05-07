import { redirect, type Handle, error } from '@sveltejs/kit';
import { getSessionUser, SESSION_COOKIE_NAME } from '$lib/server/session';
import type { UserRole } from '$lib/server/db/schema';

const PROTECTED_ROUTES: Record<string, UserRole[]> = {
	'/admin': ['admin'],
	'/member-area': ['member', 'admin'],
	'/orders': ['customer', 'admin'],
	'/dashboard': ['member', 'customer', 'admin']
};

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(SESSION_COOKIE_NAME);
	event.locals.user = await getSessionUser(sessionId);

	const pathname = event.url.pathname;

	if (event.locals.user && (pathname === '/login' || pathname.startsWith('/login/'))) {
		redirect(303, '/dashboard');
	}
	for (const routeBase in PROTECTED_ROUTES) {
		if (pathname.startsWith(routeBase)) {
			if (!event.locals.user) {
				const redirectTo = `redirectTo=${encodeURIComponent(pathname + event.url.search)}`;
				redirect(303, `/login?${redirectTo}`);
			}
			const requiredRoles = PROTECTED_ROUTES[routeBase];
			if (!requiredRoles.includes(event.locals.user.role)) {
				error(403, { message: 'Forbidden: You do not have access to this page.' });
			}
			break;
		}
	}

	const response = await resolve(event);
	return response;
};
