<script lang="ts">
	import { scrollReveal } from '$lib/action/scroll-reveal.action.js';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section class="landing-hero landing-section-pattern py-16 md:py-24 lg:py-64 border-b border-primary" aria-labelledby="hero-title">
	<div class="landing-hero-inner scroll-reveal max-w-4xl mx-auto px-4 text-center" use:scrollReveal>
		<h1 id="hero-title" class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-base-content">
			{m.hero_title()}
		</h1>
		<p class="landing-hero-subtitle mt-4 text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto">
			{m.hero_subtitle()}
		</p>
		<div class="landing-hero-actions mt-8 flex flex-wrap items-center justify-center gap-3">
			<DaisyUiLink href={WebRoutesEnum.SIGNUP} className="d-btn d-btn-primary d-btn-lg">
				{m.hero_cta_primary()}
			</DaisyUiLink>
			<DaisyUiLink href={WebRoutesEnum.PRICING} className="d-btn d-btn-outline d-btn-lg">
				{m.hero_cta_secondary()}
			</DaisyUiLink>
		</div>
	</div>
</section>
