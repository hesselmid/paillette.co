import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import { countries } from '$lib/countries';
import { db } from '$lib/server/db';
import { usersTable, customerProfilesTable } from '$lib/server/db/schema';

const PersonalInfoSchema = z.object({
	firstName: z
		.string({ required_error: 'First name is required.' })
		.trim()
		.min(1, { message: 'First name cannot be empty.' }),
	lastName: z
		.string({ required_error: 'Last name is required.' })
		.trim()
		.min(1, { message: 'Last name cannot be empty.' })
});

const CompanyNameSchema = z.object({
	companyName: z
		.string({ required_error: 'Company name is required.' })
		.trim()
		.min(1, { message: 'Company name cannot be empty.' })
});

const BillingAddressSchema = z.object({
	streetAndNumber: z
		.string({ required_error: 'Street and number are required.' })
		.trim()
		.min(1, { message: 'Street and number cannot be empty.' }),
	streetAdditional: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	postalCode: z
		.string({ required_error: 'Postal code is required.' })
		.trim()
		.min(1, { message: 'Postal code cannot be empty.' }),
	city: z
		.string({ required_error: 'City is required.' })
		.trim()
		.min(1, { message: 'City cannot be empty.' }),
	region: z
		.string()
		.trim()
		.transform((val) => (val === '' ? null : val))
		.nullable(),
	country: z
		.string({ required_error: 'Country is required.' })
		.trim()
		.toUpperCase()
		.refine((val) => val !== '' && countries.some((c) => c.code === val), {
			message: 'Please select a valid country from the list.'
		})
});

export const load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'customer') {
		error(403, 'Forbidden');
	}

	const userId = locals.user.id;

	const userPromise = db
		.select({
			firstName: usersTable.firstName,
			lastName: usersTable.lastName
		})
		.from(usersTable)
		.where(eq(usersTable.id, userId))
		.limit(1);

	const profilePromise = db
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
		.where(eq(customerProfilesTable.userId, userId))
		.limit(1);

	const [userResult, profileResult] = await Promise.all([userPromise, profilePromise]);

	const userData = userResult[0] || { firstName: '', lastName: '' };
	const profileData = profileResult[0] || {};

	const personalInfoForm = await superValidate(
		{
			firstName: userData.firstName,
			lastName: userData.lastName
		},
		zod(PersonalInfoSchema),
		{ id: 'personalInfoForm' }
	);

	const companyNameForm = await superValidate(
		{
			companyName: profileData.companyName ?? ''
		},
		zod(CompanyNameSchema),
		{ id: 'companyNameForm' }
	);

	const billingAddressForm = await superValidate(
		{
			streetAndNumber: profileData.streetAndNumber ?? '',
			streetAdditional: profileData.streetAdditional ?? null,
			postalCode: profileData.postalCode ?? '',
			city: profileData.city ?? '',
			region: profileData.region ?? null,
			country: profileData.country ?? ''
		},
		zod(BillingAddressSchema),
		{ id: 'billingAddressForm' }
	);

	return {
		personalInfoForm,
		companyNameForm,
		billingAddressForm,
		countries
	};
};

export const actions: Actions = {
	updatePersonalInfo: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') error(403, 'Forbidden');
		const form = await superValidate(request, zod(PersonalInfoSchema), { id: 'personalInfoForm' });
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await db
				.update(usersTable)
				.set({
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					updatedAt: new Date()
				})
				.where(eq(usersTable.id, locals.user.id));
			return message(form, 'Personal information updated successfully.');
		} catch (e) {
			console.error('Error updating personal info:', e);
			return message(form, 'Failed to update personal information.', { status: 500 });
		}
	},

	updateCompanyName: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') error(403, 'Forbidden');
		const form = await superValidate(request, zod(CompanyNameSchema), { id: 'companyNameForm' });
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await db
				.insert(customerProfilesTable)
				.values({
					userId: locals.user.id,
					companyName: form.data.companyName
				})
				.onConflictDoUpdate({
					target: customerProfilesTable.userId,
					set: {
						companyName: form.data.companyName,
						updatedAt: new Date()
					}
				});
			return message(form, 'Company name updated successfully.');
		} catch (e) {
			console.error('Error updating company name:', e);
			return message(form, 'Failed to update company name.', { status: 500 });
		}
	},

	updateBillingAddress: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'customer') error(403, 'Forbidden');
		const form = await superValidate(request, zod(BillingAddressSchema), {
			id: 'billingAddressForm'
		});
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await db
				.insert(customerProfilesTable)
				.values({
					userId: locals.user.id,
					streetAndNumber: form.data.streetAndNumber,
					streetAdditional: form.data.streetAdditional,
					postalCode: form.data.postalCode,
					city: form.data.city,
					region: form.data.region,
					country: form.data.country
				})
				.onConflictDoUpdate({
					target: customerProfilesTable.userId,
					set: {
						streetAndNumber: form.data.streetAndNumber,
						streetAdditional: form.data.streetAdditional,
						postalCode: form.data.postalCode,
						city: form.data.city,
						region: form.data.region,
						country: form.data.country,
						updatedAt: new Date()
					}
				});
			return message(form, 'Billing address updated successfully.');
		} catch (e) {
			console.error('Error updating billing address:', e);
			return message(form, 'Failed to update billing address.', { status: 500 });
		}
	}
};
