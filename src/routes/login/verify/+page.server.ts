import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifyOtp } from '$lib/server/otp';
import { createSession } from '$lib/server/session';
import type { PageServerLoad, Actions } from './$types';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

export const load: PageServerLoad = async ({ cookies }) => {
	const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

	if (!email) {
		redirect(303, '/login');
	}
	return {
		email
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const code = formData.get('otp')?.toString()?.trim();
		const email = cookies.get(LOGIN_VERIFY_EMAIL_COOKIE);

		if (!email) {
			return fail(400, {
				error: 'Session expired or email not found. Please try logging in again.'
			});
		}

		if (!code) {
			return fail(400, { email, error: 'OTP is required.' });
		}
		if (!/^\d{6}$/.test(code)) {
			return fail(400, { email, error: 'OTP must be 6 digits.' });
		}

		const userQuery = await db
			.select({ id: usersTable.id })
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

		redirect(303, '/dashboard');
	}
};
