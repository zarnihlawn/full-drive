<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import LAuthVerifyEmailCard from '$lib/component/local/public/auth/verify-email/LAuthVerifyEmailCard.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.verify_email_title()} | {m.full_drive()}</title>
</svelte:head>

<LAuthVerifyEmailCard email={data.email} form={form} />
