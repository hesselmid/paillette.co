import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable, customerProfilesTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const ProfileUpdateSchema = z.object({
	firstName: z
		.string({ required_error: 'First name is required.' })
		.trim()
		.min(1, { message: 'First name cannot be empty.' }),
	lastName: z
		.string({ required_error: 'Last name is required.' })
		.trim()
		.min(1, { message: 'Last name cannot be empty.' }),
	companyName: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable()
});

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}

	let currentCompanyName: string | null = null;

	try {
		const profileResult = await db
			.select({
				companyName: customerProfilesTable.companyName
			})
			.from(customerProfilesTable)
			.where(eq(customerProfilesTable.userId, locals.user.id))
			.limit(1);

		if (profileResult.length > 0) {
			currentCompanyName = profileResult[0].companyName;
		}
	} catch (e) {
		console.error('Error fetching customer profile data:', e);
	}

	const initialData = {
		firstName: locals.user.firstName,
		lastName: locals.user.lastName,
		companyName: currentCompanyName
	};

	const form = await superValidate(initialData, zod(ProfileUpdateSchema));

	return {
		form,
		userEmail: locals.user.email
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			const form = await superValidate(request, zod(ProfileUpdateSchema));
			return fail(403, { form, message: 'Forbidden' });
		}

		const form = await superValidate(request, zod(ProfileUpdateSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { firstName, lastName, companyName } = form.data;

		try {
			await db.transaction(async (tx) => {
				await tx
					.update(usersTable)
					.set({
						firstName,
						lastName,
						updatedAt: new Date()
					})
					.where(eq(usersTable.id, locals.user!.id));

				await tx
					.insert(customerProfilesTable)
					.values({
						userId: locals.user!.id,
						companyName: companyName
					})
					.onConflictDoUpdate({
						target: customerProfilesTable.userId,
						set: {
							companyName: companyName,
							updatedAt: new Date()
						}
					});
			});

			form.data = { firstName, lastName, companyName };
			return message(form, 'Profile updated successfully.');
		} catch (e) {
			console.error('Error updating profile:', e);
			return message(form, 'Failed to update profile. Please try again.', {
				status: 500
			});
		}
	}
} satisfies Actions;
