// src/routes/admin/users/+page.server.ts
import { db } from '$lib/server/db'; // Adjust the path to your db instance
import { usersTable } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Ensure only admins can access this server load function
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Forbidden');
	}

	try {
		// Fetch user data - select only the fields needed for the list view
		const usersList = await db
			.select({
				id: usersTable.id,
				firstName: usersTable.firstName,
				lastName: usersTable.lastName,
				email: usersTable.email,
				role: usersTable.role,
				createdAt: usersTable.createdAt // Useful for sorting or display
			})
			.from(usersTable)
			.orderBy(asc(usersTable.lastName), asc(usersTable.firstName)); // Example: Sort by last name, then first name

		return {
			usersList // Pass the user list to the page component
		};
	} catch (e) {
		console.error('Error fetching users for admin list:', e);
		error(500, 'Failed to load user data.');
	}
};
