<script lang="ts">
	import LAuthForgetPasswordCard from '$lib/component/local/public/auth/forget-password/LAuthForgetPasswordCard.svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.forgot_password()} | {m.full_drive()}</title>
</svelte:head>

<LAuthForgetPasswordCard />
