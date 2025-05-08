import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Forbidden');
	}

	try {
		const usersList = await db
			.select({
				id: usersTable.id,
				firstName: usersTable.firstName,
				lastName: usersTable.lastName,
				email: usersTable.email,
				role: usersTable.role,
				createdAt: usersTable.createdAt
			})
			.from(usersTable)
			.orderBy(desc(usersTable.createdAt));

		return {
			usersList
		};
	} catch (e) {
		console.error('Error fetching users for admin list:', e);
		error(500, 'Failed to load user data.');
	}
};
