import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { generateOtp, sendOtpEmail } from '$lib/server/otp';

const LOGIN_VERIFY_EMAIL_COOKIE = 'sk_login_verify_email';

const LoginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email format.' })
		.transform((val) => val.trim().toLowerCase())
});

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const validationResult = LoginSchema.safeParse(data);

		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors;
			return fail(400, {
				email: data.email,
				errors: {
					email: errors.email?.[0]
				}
			});
		}

		const { email } = validationResult.data;

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
} satisfies Actions;
