import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Forbidden');
	}

	return {
		currentUser: {
			firstName: locals.user.firstName
		}
	};
};
