<script lang="ts">
	import GPublicLandingFooterbar from '$lib/component/global/public/landing/GPublicLandingFooterbar.svelte';
	import GPublicLandingNavbar from '$lib/component/global/public/landing/GPublicLandingNavbar.svelte';

	let { children } = $props();
</script>

<div class="my-web">
	<section class="landing-navbar">
		<GPublicLandingNavbar />
	</section>
	<div class="my-main">
		{@render children()}
	</div>
	<div class="landing-footerbar">
		<GPublicLandingFooterbar />
	</div>
</div>
