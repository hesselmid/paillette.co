import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { generateOtp, sendOtpEmail } from '$lib/server/otp';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

const LoginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email format.' })
		.trim()
		.toLowerCase()
});

export const load = async () => {
	const form = await superValidate(zod(LoginSchema));
	return { form };
};

export const actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(request, zod(LoginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email } = form.data;

		const existingUserQuery = await db
			.select({ id: usersTable.id })
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (!existingUserQuery.length) {
			return message(form, 'This email is not registered.', {
				status: 404
			});
		}

		const userId = existingUserQuery[0].id;
		try {
			const otp = await generateOtp(userId);
			await sendOtpEmail(email, otp);
		} catch (error) {
			console.error('Error generating or sending OTP:', error);
			return message(form, 'Could not send OTP. Please try again later.', {
				status: 500
			});
		}

		cookies.set(LOGIN_VERIFY_EMAIL_COOKIE, email, {
			path: '/login/verify',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 5 * 60
		});

		redirect(303, '/login/verify');
	}
} satisfies Actions;
