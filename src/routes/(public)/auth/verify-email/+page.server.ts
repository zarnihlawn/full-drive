import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth.js';
import { APIError } from 'better-auth';
import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';

const VERIFY_EMAIL_TYPE = 'email-verification' as const;

export const load: PageServerLoad = async (event) => {
	const email = event.url.searchParams.get('email')?.trim();
	if (!email) {
		throw redirect(302, WebRoutesEnum.SIGNUP);
	}
	return { email };
};

export const actions: Actions = {
	sendOtp: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString()?.trim() ?? '';

		if (!email) {
			return fail(400, { sendOtpMessage: 'Email is required' });
		}

		try {
			await auth.api.sendVerificationOTP({
				body: {
					email,
					type: VERIFY_EMAIL_TYPE
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { sendOtpMessage: error.message ?? 'Failed to send code' });
			}
			return fail(500, { sendOtpMessage: 'Failed to send code. Try again.' });
		}

		return { sendOtpSuccess: true };
	},
	verifyOtp: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString()?.trim() ?? '';
		const otp = formData.get('otp')?.toString()?.trim() ?? '';

		if (!email || !otp) {
			return fail(400, { message: 'Email and code are required' });
		}

		try {
			await auth.api.verifyEmailOTP({
				body: { email, otp }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message ?? 'Invalid or expired code' });
			}
			return fail(500, { message: 'Verification failed. Try again.' });
		}

		throw redirect(302, WebRoutesEnum.LANDING_PAGE);
	}
};
