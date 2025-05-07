import { db } from './db';
import { otpsTable } from './db/schema';
import { eq, and, gt, desc } from 'drizzle-orm';
import crypto from 'crypto';
import { env } from '$env/dynamic/private';
import { LoopsClient } from 'loops';

const OTP_EXPIRY_MINUTES = 5;

const loops = new LoopsClient(env.LOOPS_API_KEY!);

export async function generateOtp(userId: number): Promise<string> {
	const code = crypto.randomInt(100000, 999999).toString();
	const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

	await db.delete(otpsTable).where(eq(otpsTable.userId, userId));

	await db.insert(otpsTable).values({
		userId,
		code,
		expiresAt
	});

	return code;
}

export async function verifyOtp(userId: number, code: string): Promise<boolean> {
	const now = new Date();

	const result = await db
		.select()
		.from(otpsTable)
		.where(
			and(eq(otpsTable.userId, userId), eq(otpsTable.code, code), gt(otpsTable.expiresAt, now))
		)
		.orderBy(desc(otpsTable.createdAt))
		.limit(1);

	if (result.length > 0) {
		await db.delete(otpsTable).where(eq(otpsTable.id, result[0].id!));
		return true;
	}
	return false;
}

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
	console.log(`DEMO: Sending OTP ${otp} to ${email}`);

	const response = await loops.sendTransactionalEmail({
		transactionalId: 'cmae39blz4yvv13n6wpvgyzl9',
		email,
		dataVariables: {
			otp
		}
	});

	console.log(response);
}
