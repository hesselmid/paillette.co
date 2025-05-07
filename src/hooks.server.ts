import { redirect, type Handle, error } from '@sveltejs/kit';
import { getSessionUser } from '$lib/server/session';
import type { UserRole } from '$lib/server/db/schema';

const PROTECTED_ROUTES: Record<string, UserRole[]> = {
	'/admin': ['admin'],
	'/member-area': ['member', 'admin'],
	'/orders': ['customer', 'admin'],
	'/dashboard': ['member', 'customer', 'admin']
};

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');
	event.locals.user = await getSessionUser(sessionId);

	console.log(event.locals.user);

	const pathname = event.url.pathname;

	if (event.locals.user && (pathname === '/login' || pathname.startsWith('/login/'))) {
		redirect(303, '/');
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
