import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { verifyOtp } from '$lib/server/otp';
import { createSession } from '$lib/server/session';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

const OtpVerifySchema = z.object({
	otp: z
		.string({ required_error: 'OTP is required.' })
		.trim()
		.min(6, { message: 'OTP must be 6 digits.' })
		.max(6, { message: 'OTP must be 6 digits.' })
		.regex(/^\d+$/, { message: 'OTP must only contain digits.' })
});

export const load = async ({ cookies }) => {
	const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

	if (!email) {
		redirect(303, '/login');
	}

	const form = await superValidate(zod(OtpVerifySchema));

	return {
		form,
		email
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

		const form = await superValidate(request, zod(OtpVerifySchema));

		if (!email) {
			return message(form, 'Session expired or email not found. Please try logging in again.', {
				status: 400
			});
		}

		if (!form.valid) {
			return fail(400, { form, email });
		}

		const { otp: code } = form.data;

		const userQuery = await db
			.select({ id: usersTable.id, role: usersTable.role })
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (!userQuery.length) {
			return message(form, 'User not found.', { status: 404 });
		}

		const user = userQuery[0];
		const isValidOtp = await verifyOtp(user.id, code);

		if (!isValidOtp) {
			return message(form, 'Invalid or expired OTP. Please try again.');
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
			default:
				redirectPath = '/';
				break;
		}

		redirect(303, redirectPath);
	}
} satisfies Actions;
