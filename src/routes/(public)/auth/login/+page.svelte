<script lang="ts">
	import type { ActionData } from './$types';
	import LAuthLoginCard from '$lib/component/local/public/auth/login/LAuthLoginCard.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.log_in()} | {m.full_drive()}</title>
</svelte:head>

<LAuthLoginCard form={form} />
