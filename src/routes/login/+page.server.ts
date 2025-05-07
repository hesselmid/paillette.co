import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { generateOtp, sendOtpEmail } from '$lib/server/otp';
import type { Actions } from './$types';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString()?.trim().toLowerCase();

		if (!email) {
			return fail(400, { email, error: 'Email is required.' });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { email, error: 'Invalid email format.' });
		}

		const existingUserQuery = await db
			.select({ id: usersTable.id })
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (!existingUserQuery.length) {
			return fail(404, { email, error: 'This email is not registered.' });
		}

		const userId = existingUserQuery[0].id;
		const otp = await generateOtp(userId);
		await sendOtpEmail(email, otp);

		cookies.set(LOGIN_VERIFY_EMAIL_COOKIE, email, {
			path: '/login/verify',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 5 * 60
		});

		redirect(303, '/login/verify');
	}
};
