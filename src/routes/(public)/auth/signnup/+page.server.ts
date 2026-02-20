import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth.js';
import { APIError } from 'better-auth';
import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';

const DEFAULT_CALLBACK_URL = WebRoutesEnum.LANDING_PAGE;

function verifyEmailUrl(email: string): string {
	return `${WebRoutesEnum.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`;
}

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, DEFAULT_CALLBACK_URL);
	}
	return {};
};

export const actions: Actions = {
	signUpEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString()?.trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString()?.trim() ?? '';
		const callbackURL = formData.get('callbackURL')?.toString() || DEFAULT_CALLBACK_URL;

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required' });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name: name || undefined,
					callbackURL: verifyEmailUrl(email)
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message ?? 'Registration failed' });
			}
			return fail(500, { message: 'Something went wrong. Please try again.' });
		}

		throw redirect(302, verifyEmailUrl(email));
	},
	signInSocial: async (event) => {
		const formData = await event.request.formData();
		const provider = formData.get('provider')?.toString() ?? 'github';
		const callbackURL = formData.get('callbackURL')?.toString() || DEFAULT_CALLBACK_URL;

		const result = await auth.api.signInSocial({
			body: {
				provider: provider as 'github',
				callbackURL
			}
		});

		if (result?.url) {
			throw redirect(302, result.url);
		}
		return fail(400, { message: 'Sign-in failed' });
	}
};
