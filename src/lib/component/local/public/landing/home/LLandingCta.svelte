<script lang="ts">
	import { scrollReveal } from '$lib/action/scroll-reveal.action.js';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section class="landing-cta landing-section-pattern py-16 md:py-20 px-4 lg:py-64 border-b border-primary" aria-labelledby="cta-title">
	<div class="scroll-reveal max-w-2xl mx-auto text-center" use:scrollReveal>
		<h2 id="cta-title" class="landing-cta-title text-2xl md:text-3xl font-bold text-base-content">
			{m.cta_title()}
		</h2>
		<p class="mt-2 text-base-content/80">
			{m.cta_subtitle()}
		</p>
		<DaisyUiLink href={WebRoutesEnum.SIGNUP} className="d-btn d-btn-primary d-btn-lg mt-6">
			{m.cta_button()}
		</DaisyUiLink>
	</div>
</section>
