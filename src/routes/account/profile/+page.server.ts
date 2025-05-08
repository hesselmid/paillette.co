import { error, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable, customerProfilesTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';

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

	return {
		currentUser: {
			firstName: locals.user.firstName,
			lastName: locals.user.lastName,
			email: locals.user.email,
			companyName: currentCompanyName
		}
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') {
			return fail(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const dataToValidate = {
			firstName: formData.get('firstName')?.toString(),
			lastName: formData.get('lastName')?.toString(),
			companyName: formData.get('companyName')?.toString()
		};

		const validationResult = ProfileUpdateSchema.safeParse(dataToValidate);

		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors;
			return fail(400, {
				data: dataToValidate,
				errors
			});
		}

		const { firstName, lastName, companyName } = validationResult.data;

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

			return {
				success: true,
				message: 'Profile updated successfully.',
				updatedData: { firstName, lastName, companyName }
			};
		} catch (e) {
			console.error('Error updating profile:', e);
			return fail(500, {
				data: dataToValidate,
				message: 'Failed to update profile. Please try again.'
			});
		}
	}
} satisfies Actions;
