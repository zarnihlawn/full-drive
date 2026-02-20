import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth.js';
import { APIError } from 'better-auth';
import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';

const DEFAULT_CALLBACK_URL = WebRoutesEnum.LANDING_PAGE;

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, DEFAULT_CALLBACK_URL);
	}
	return {};
};

export const actions: Actions = {
	signInEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString()?.trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const callbackURL = formData.get('callbackURL')?.toString() || DEFAULT_CALLBACK_URL;

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required' });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message ?? 'Invalid email or password' });
			}
			return fail(500, { message: 'Something went wrong. Please try again.' });
		}

		throw redirect(302, callbackURL);
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
