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
		sendOtpSuccess?: boolean;
		sendOtpMessage?: string;
	}

	let { email, form }: { email: string; form?: FormShape | null } = $props();
</script>

<DaisyUiCard className="auth-card d-card-compact shadow-lg">
	<DaisyUiCardBody>
		<DaisyUiCardBodyTitle className="text-2xl">
			{m.verify_email_title()}
		</DaisyUiCardBodyTitle>

		<p class="mt-2 text-base-content/80 text-sm">
			{m.verify_email_sent()} <strong>{email}</strong>
		</p>

		<form method="post" action="?/verifyOtp" use:enhance class="mt-4 space-y-4">
			<input type="hidden" name="email" value={email} />

			<label class="d-form-control w-full">
				<span class="d-label-text">{m.verify_email_placeholder()}</span>
				<input
					type="text"
					name="otp"
					inputmode="numeric"
					autocomplete="one-time-code"
					pattern="[0-9]*"
					maxlength={6}
					placeholder="000000"
					class="d-input d-input-bordered w-full text-center text-lg tracking-[0.5em]"
					required
				/>
			</label>

			{#if form?.message}
				<p class="text-error text-sm">{form.message}</p>
			{/if}

			<DaisyUiButton type="submit" className="d-btn-primary d-btn-block">
				{m.verify_submit()}
			</DaisyUiButton>
		</form>

		<div class="mt-6 border-t border-base-300 pt-4">
			<form method="post" action="?/sendOtp" use:enhance>
				<input type="hidden" name="email" value={email} />
				<DaisyUiButton type="submit" className="d-btn d-btn-ghost d-btn-block d-btn-sm">
					{m.resend_code()}
				</DaisyUiButton>
			</form>
			{#if form?.sendOtpSuccess}
				<p class="text-success text-sm mt-1">Code sent. Check your email.</p>
			{/if}
			{#if form?.sendOtpMessage}
				<p class="text-error text-sm mt-1">{form.sendOtpMessage}</p>
			{/if}
		</div>

		<p class="mt-4 text-center text-sm text-base-content/70">
			<DaisyUiLink href={WebRoutesEnum.LOGIN} className="d-link d-link-hover">
				{m.log_in()}
			</DaisyUiLink>
		</p>
	</DaisyUiCardBody>
</DaisyUiCard>
