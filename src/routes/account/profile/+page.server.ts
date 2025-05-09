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
		.nullable(),
	streetAndNumber: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	streetAdditional: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	postalCode: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	city: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	region: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	country: z
		.string()
		.trim()
		.length(2, { message: 'Country must be a 2-letter ISO code (e.g., US, GB).' })
		.toUpperCase()
		.transform((val) => (val === '' ? null : val))
		.nullable()
		.refine((val) => val === null || /^[A-Z]{2}$/.test(val), {
			message: 'Country must be a 2-letter ISO code (e.g., US, GB).'
		})
});

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}

	let customerProfileData: {
		companyName: string | null;
		streetAndNumber: string | null;
		streetAdditional: string | null;
		postalCode: string | null;
		city: string | null;
		region: string | null;
		country: string | null;
	} = {
		companyName: null,
		streetAndNumber: null,
		streetAdditional: null,
		postalCode: null,
		city: null,
		region: null,
		country: null
	};

	try {
		const profileResult = await db
			.select({
				companyName: customerProfilesTable.companyName,
				streetAndNumber: customerProfilesTable.streetAndNumber,
				streetAdditional: customerProfilesTable.streetAdditional,
				postalCode: customerProfilesTable.postalCode,
				city: customerProfilesTable.city,
				region: customerProfilesTable.region,
				country: customerProfilesTable.country
			})
			.from(customerProfilesTable)
			.where(eq(customerProfilesTable.userId, locals.user.id))
			.limit(1);

		if (profileResult.length > 0) {
			customerProfileData = profileResult[0];
		}
	} catch (e) {
		console.error('Error fetching customer profile data:', e);
	}

	const initialData = {
		firstName: locals.user.firstName,
		lastName: locals.user.lastName,
		companyName: customerProfileData.companyName,
		streetAndNumber: customerProfileData.streetAndNumber,
		streetAdditional: customerProfileData.streetAdditional,
		postalCode: customerProfileData.postalCode,
		city: customerProfileData.city,
		region: customerProfileData.region,
		country: customerProfileData.country
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

		const {
			firstName,
			lastName,
			companyName,
			streetAndNumber,
			streetAdditional,
			postalCode,
			city,
			region,
			country
		} = form.data;

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
						companyName,
						streetAndNumber,
						streetAdditional,
						postalCode,
						city,
						region,
						country,
						createdAt: new Date()
					})
					.onConflictDoUpdate({
						target: customerProfilesTable.userId,
						set: {
							companyName,
							streetAndNumber,
							streetAdditional,
							postalCode,
							city,
							region,
							country,
							updatedAt: new Date()
						}
					});
			});

			return message(form, 'Profile updated successfully.');
		} catch (e) {
			console.error('Error updating profile:', e);
			return message(form, 'Failed to update profile. Please try again.', {
				status: 500
			});
		}
	}
} satisfies Actions;
