<script lang="ts">
	import { scrollReveal } from '$lib/action/scroll-reveal.action.js';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section class="landing-features py-16 md:py-20 px-4 lg:py-96" aria-labelledby="features-title">
	<div class="max-w-5xl mx-auto">
		<h2 id="features-title" class="landing-features-title scroll-reveal text-2xl md:text-3xl font-bold text-center text-base-content mb-12" use:scrollReveal>
			{m.features_title()}
		</h2>
		<div class="scroll-reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" use:scrollReveal>
			<article class="landing-feature-card d-card d-card-compact bg-base-200/50 shadow-sm">
				<div class="d-card-body">
					<h3 class="d-card-title text-lg">{m.feature_1_title()}</h3>
					<p class="text-base-content/80 text-sm leading-relaxed">{m.feature_1_desc()}</p>
				</div>
			</article>
			<article class="landing-feature-card d-card d-card-compact bg-base-200/50 shadow-sm">
				<div class="d-card-body">
					<h3 class="d-card-title text-lg">{m.feature_2_title()}</h3>
					<p class="text-base-content/80 text-sm leading-relaxed">{m.feature_2_desc()}</p>
				</div>
			</article>
			<article class="landing-feature-card d-card d-card-compact bg-base-200/50 shadow-sm">
				<div class="d-card-body">
					<h3 class="d-card-title text-lg">{m.feature_3_title()}</h3>
					<p class="text-base-content/80 text-sm leading-relaxed">{m.feature_3_desc()}</p>
				</div>
			</article>
		</div>
	</div>
</section>
