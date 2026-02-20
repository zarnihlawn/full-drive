<script lang="ts">
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';

	let { children } = $props();
</script>

<div class="auth-layout my-dotted-background-teal min-h-screen flex flex-col items-center justify-center px-4 py-8">
	<a
		href={WebRoutesEnum.LANDING_PAGE}
		class="mb-6 flex items-center gap-2 text-xl font-semibold text-base-content hover:opacity-90"
	>
		{m.full_drive()}
	</a>
	<main class="w-full max-w-md">
		{@render children()}
	</main>
</div>
