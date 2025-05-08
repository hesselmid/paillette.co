import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { verifyOtp } from '$lib/server/otp';
import { createSession } from '$lib/server/session';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

const OtpVerifySchema = z.object({
	otp: z
		.string({ required_error: 'OTP is required.' })
		.trim()
		.min(1, { message: 'OTP is required.' })
		.length(6, { message: 'OTP must be 6 digits.' })
		.regex(/^\d+$/, { message: 'OTP must only contain digits.' })
});

export const load = async ({ cookies }) => {
	const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

	if (!email) {
		redirect(303, '/login');
	}
	return {
		email
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

		if (!email) {
			return fail(400, {
				error: 'Session expired or email not found. Please try logging in again.'
			});
		}

		const dataToValidate = {
			otp: formData.get('otp')?.toString()
		};

		const validationResult = OtpVerifySchema.safeParse(dataToValidate);

		if (!validationResult.success) {
			const otpError = validationResult.error.flatten().fieldErrors.otp?.[0];
			return fail(400, {
				email,
				otp: dataToValidate.otp,
				error: otpError || 'Invalid OTP format.'
			});
		}

		const { otp: code } = validationResult.data;

		const userQuery = await db
			.select({ id: usersTable.id, role: usersTable.role })
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (!userQuery.length) {
			return fail(404, { email, error: 'User not found.' });
		}

		const user = userQuery[0];
		const isValidOtp = await verifyOtp(user.id, code);

		if (!isValidOtp) {
			return fail(400, { email, error: 'Invalid or expired OTP. Please try again.' });
		}

		await createSession(user.id, cookies);
		cookies.delete(LOGIN_VERIFY_EMAIL_COOKIE, { path: '/login/verify' });

		let redirectPath: string;
		switch (user.role) {
			case 'member':
				redirectPath = '/member/dashboard';
				break;
			case 'customer':
				redirectPath = '/account/dashboard';
				break;
			case 'admin':
				redirectPath = '/admin/dashboard';
				break;
		}

		redirect(303, redirectPath);
	}
} satisfies Actions;
