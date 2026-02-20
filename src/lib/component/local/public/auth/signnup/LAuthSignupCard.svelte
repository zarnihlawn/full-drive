<script lang="ts">
	import { enhance } from '$app/forms';
	import DaisyUiButton from '$lib/component/library/daisyui/button/DaisyUiButton.svelte';
	import DaisyUiCard from '$lib/component/library/daisyui/card/DaisyUiCard.svelte';
	import DaisyUiCardBody from '$lib/component/library/daisyui/card/body/DaisyUiCardBody.svelte';
	import DaisyUiCardBodyTitle from '$lib/component/library/daisyui/card/body/title/DaisyUiCardBodyTitle.svelte';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';

	interface FormShape {
		message?: string;
	}

	let { form }: { form?: FormShape | null } = $props();
</script>

<DaisyUiCard className="auth-card d-card-compact shadow-lg">
	<DaisyUiCardBody>
		<DaisyUiCardBodyTitle className="text-2xl">
			{m.signup_title()}
		</DaisyUiCardBodyTitle>

		<form method="post" action="?/signUpEmail" use:enhance class="auth-form mt-4 space-y-4">
			<input type="hidden" name="callbackURL" value={WebRoutesEnum.LANDING_PAGE} />

			<label class="d-form-control w-full">
				<span class="d-label-text">{m.name()}</span>
				<input
					type="text"
					name="name"
					autocomplete="name"
					class="d-input d-input-bordered w-full"
					placeholder="Your name"
				/>
			</label>

			<label class="d-form-control w-full">
				<span class="d-label-text">{m.email()}</span>
				<input
					type="email"
					name="email"
					autocomplete="email"
					required
					class="d-input d-input-bordered w-full"
					placeholder="you@example.com"
				/>
			</label>

			<label class="d-form-control w-full">
				<span class="d-label-text">{m.password()}</span>
				<input
					type="password"
					name="password"
					autocomplete="new-password"
					required
					minlength={8}
					class="d-input d-input-bordered w-full"
					placeholder="••••••••"
				/>
				<span class="d-label-text-alt">At least 8 characters</span>
			</label>

			{#if form?.message}
				<p class="text-error text-sm">{form.message}</p>
			{/if}

			<DaisyUiButton type="submit" className="d-btn-primary d-btn-block">
				{m.sign_up_submit()}
			</DaisyUiButton>
		</form>

		<div class="auth-divider my-6 flex items-center gap-3">
			<span class="d-divider d-divider-horizontal flex-1"></span>
			<span class="text-base-content/60 text-sm">or</span>
			<span class="d-divider d-divider-horizontal flex-1"></span>
		</div>

		<form method="post" action="?/signInSocial" use:enhance>
			<input type="hidden" name="provider" value="github" />
			<input type="hidden" name="callbackURL" value={WebRoutesEnum.LANDING_PAGE} />
			<DaisyUiButton type="submit" className="d-btn d-btn-outline d-btn-block gap-2">
				<svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
				</svg>
				{m.sign_in_with_github()}
			</DaisyUiButton>
		</form>

		<p class="mt-6 text-center text-sm text-base-content/80">
			{m.already_have_account()}
			<DaisyUiLink href={WebRoutesEnum.LOGIN} className="d-link d-link-primary d-link-hover ml-1 font-medium">
				{m.log_in()}
			</DaisyUiLink>
		</p>
	</DaisyUiCardBody>
</DaisyUiCard>
