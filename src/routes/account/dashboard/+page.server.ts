import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { customerProfilesTable } from '$lib/server/db/schema';

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden: You do not have access to this page.');
	}

	let companyName: string | null = null;

	try {
		const profileResult = await db
			.select({
				companyName: customerProfilesTable.companyName
			})
			.from(customerProfilesTable)
			.where(eq(customerProfilesTable.userId, locals.user.id))
			.limit(1);

		if (profileResult.length > 0 && profileResult[0].companyName) {
			companyName = profileResult[0].companyName;
		}
	} catch (e) {
		console.error('Error fetching customer profile for dashboard:', e);
	}

	return {
		currentUser: {
			firstName: locals.user.firstName,
			companyName: companyName
		},
		footerColor: 'enoki'
	};
};
