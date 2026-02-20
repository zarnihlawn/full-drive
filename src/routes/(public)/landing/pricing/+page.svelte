<script lang="ts">
	import LLandingPricingCards from '$lib/component/local/public/landing/pricing/LLandingPricingCards.svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.pricing()} | Full Drive</title>
</svelte:head>

<LLandingPricingCards />
