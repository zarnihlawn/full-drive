<script lang="ts">
	import DaisyUiCard from '$lib/component/library/daisyui/card/DaisyUiCard.svelte';
	import DaisyUiCardBody from '$lib/component/library/daisyui/card/body/DaisyUiCardBody.svelte';
	import DaisyUiCardBodyTitle from '$lib/component/library/daisyui/card/body/title/DaisyUiCardBodyTitle.svelte';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';
</script>

<DaisyUiCard className="auth-card d-card-compact shadow-lg">
	<DaisyUiCardBody>
		<DaisyUiCardBodyTitle className="text-2xl">
			{m.forgot_password()}
		</DaisyUiCardBodyTitle>
		<p class="mt-2 text-base-content/80">
			Password reset is not configured yet. Please contact support or try logging in with GitHub.
		</p>
		<DaisyUiLink href={WebRoutesEnum.LOGIN} className="d-btn d-btn-primary d-btn-block mt-4">
			{m.log_in()}
		</DaisyUiLink>
	</DaisyUiCardBody>
</DaisyUiCard>
