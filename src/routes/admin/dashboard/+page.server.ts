import { error } from '@sveltejs/kit';

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
