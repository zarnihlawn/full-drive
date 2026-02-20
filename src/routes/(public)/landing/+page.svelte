<script lang="ts">
	import LLandingCta from '$lib/component/local/public/landing/home/LLandingCta.svelte';
	import LLandingFeatures from '$lib/component/local/public/landing/home/LLandingFeatures.svelte';
	import LLandingHero from '$lib/component/local/public/landing/home/LLandingHero.svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.full_drive()}</title>
</svelte:head>

<LLandingHero />
<LLandingFeatures />
<LLandingCta />
