import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { emailOTP } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { sendEmail } from '$lib/server/mailer.js';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	plugins: [
		emailOTP({
			overrideDefaultEmailVerification: true,
			expiresIn: 600,
			otpLength: 6,
			sendVerificationOnSignUp: true,
			async sendVerificationOTP({ email, otp, type }) {
				const subject =
					type === 'email-verification'
						? 'Verify your email'
						: type === 'sign-in'
							? 'Your sign-in code'
							: 'Reset your password';
				const text = `Your verification code is: ${otp}\n\nIt expires in 10 minutes.`;
				// Don't await to avoid timing attacks; fire and forget
				void sendEmail({ to: email, subject, text });
			}
		}),
		sveltekitCookies(getRequestEvent)
	]
});
