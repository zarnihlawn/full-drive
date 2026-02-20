<script lang="ts">
	import type { ActionData } from './$types';
	import LAuthSignupCard from '$lib/component/local/public/auth/signnup/LAuthSignupCard.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.sign_up()} | {m.full_drive()}</title>
</svelte:head>

<LAuthSignupCard form={form} />
