<script lang="ts">
	import DaisyUiBadge from '$lib/component/library/daisyui/badge/DaisyUiBadge.svelte';
	import DaisyUiButton from '$lib/component/library/daisyui/button/DaisyUiButton.svelte';
	import DaisyUiCard from '$lib/component/library/daisyui/card/DaisyUiCard.svelte';
	import DaisyUiCardBody from '$lib/component/library/daisyui/card/body/DaisyUiCardBody.svelte';
	import DaisyUiCardBodyTitle from '$lib/component/library/daisyui/card/body/title/DaisyUiCardBodyTitle.svelte';
	import DaisyUiJoin from '$lib/component/library/daisyui/join/DaisyUiJoin.svelte';
	import DaisyUiJoinItem from '$lib/component/library/daisyui/join/item/DaisyUiJoinItem.svelte';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import LucideCircleCheck from '$lib/component/library/lucide/LucideCircleCheck.svelte';
	import LucideCircleX from '$lib/component/library/lucide/LucideCircleX.svelte';
	import { PRICING_PLANS } from '$lib/constant/pricing.constant.js';
	import type { PricingPlan } from '$lib/constant/pricing.constant.js';
	import { m } from '$lib/paraglide/messages.js';

	type BillingPeriod = 'monthly' | 'yearly';
	let billingPeriod = $state<BillingPeriod>('monthly');

	function priceDisplay(plan: PricingPlan): string {
		if (plan.id === 'payAsYouGo' && plan.usagePriceLine) return plan.usagePriceLine;
		if (billingPeriod === 'monthly') {
			if (plan.monthlyPrice === null) return '';
			if (plan.monthlyPrice === 0) return m.free_label();
			return `$${plan.monthlyPrice}`;
		}
		if (plan.yearlyPrice === null) return '';
		if (plan.yearlyPrice === 0) return m.free_label();
		return `$${plan.yearlyPrice}`;
	}

	function priceSuffix(plan: PricingPlan): string {
		if (plan.id === 'payAsYouGo') return '';
		if (billingPeriod === 'monthly') return m.per_month();
		return m.per_year();
	}
</script>

<section class="pricing-section my-dotted-background-teal" aria-labelledby="pricing-title">
	<div class="pricing-container">
		<header class="pricing-header">
			<h1 id="pricing-title" class="pricing-title">{m.pricing_title()}</h1>
			<p class="pricing-subtitle">{m.pricing_subtitle()}</p>

			<div class="pricing-toggle-wrap">
				<DaisyUiJoin className="d-join-sm md:d-join-md">
					<DaisyUiJoinItem>
						<button
							type="button"
							class="d-btn d-join-item d-btn-sm md:d-btn-md w-full md:min-w-28 {billingPeriod === 'monthly'
								? 'd-btn-active'
								: ''}"
							onclick={() => (billingPeriod = 'monthly')}
						>
							{m.billing_monthly()}
						</button>
					</DaisyUiJoinItem>
					<DaisyUiJoinItem>
						<button
							type="button"
							class="d-btn d-join-item d-btn-sm md:d-btn-md w-full md:min-w-28 {billingPeriod === 'yearly'
								? 'd-btn-active'
								: ''}"
							onclick={() => (billingPeriod = 'yearly')}
						>
							{m.billing_yearly()}
						</button>
					</DaisyUiJoinItem>
				</DaisyUiJoin>
			</div>
		</header>

		<div class="pricing-grid">
			{#each PRICING_PLANS as plan (plan.id)}
				<article
					class="pricing-card-wrap"
					class:highlighted={plan.highlighted}
				>
					{#if plan.highlighted}
						<div class="pricing-card-badge">
							<DaisyUiBadge className="d-badge-primary">
								{m.most_popular()}
							</DaisyUiBadge>
						</div>
					{/if}
					{#if billingPeriod === 'yearly' && plan.yearlyBadge}
						<div class="pricing-card-badge pricing-card-badge--yearly">
							<DaisyUiBadge className="d-badge-success d-badge-sm">
								{plan.yearlyBadge}
							</DaisyUiBadge>
						</div>
					{/if}

					<DaisyUiCard className="pricing-card h-full flex flex-col">
						<DaisyUiCardBody className="flex flex-col flex-1 gap-4">
							<div>
								<DaisyUiCardBodyTitle className="text-xl md:text-2xl">
									{plan.name}
								</DaisyUiCardBodyTitle>
								<p class="text-base-content/70 text-sm mt-1">{plan.tagline}</p>
							</div>

							<div class="pricing-card-storage">
								<span class="pricing-card-storage-value">{plan.storage}</span>
							</div>

							<div class="pricing-card-price">
								{#if plan.id === 'payAsYouGo'}
									<span class="pricing-card-price-value text-lg">{priceDisplay(plan)}</span>
								{:else}
									<span class="pricing-card-price-value">{priceDisplay(plan)}</span>
									{#if plan.monthlyPrice !== null && plan.monthlyPrice !== undefined}
										<span class="pricing-card-price-suffix">{priceSuffix(plan)}</span>
									{/if}
								{/if}
							</div>

							<ul class="pricing-features" role="list">
								{#each plan.features as feature (feature.text)}
									<li class="pricing-feature">
										{#if feature.included}
											<span class="pricing-feature-icon included" aria-hidden="true">
												<LucideCircleCheck className="size-5 shrink-0" />
											</span>
										{:else}
											<span class="pricing-feature-icon excluded" aria-hidden="true">
												<LucideCircleX className="size-5 shrink-0" />
											</span>
										{/if}
										<span class="pricing-feature-text" class:opacity-60={!feature.included}>
											{feature.text}
										</span>
									</li>
								{/each}
							</ul>

							<div class="mt-auto pt-2">
								<DaisyUiLink
									href={plan.ctaHref}
									className="d-btn d-btn-block {plan.ctaVariant === 'primary'
										? 'd-btn-primary'
										: plan.ctaVariant === 'secondary'
											? 'd-btn-outline'
											: 'd-btn-ghost'}"
								>
									{plan.ctaLabel}
								</DaisyUiLink>
							</div>
						</DaisyUiCardBody>
					</DaisyUiCard>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.pricing-section {
		padding: 2.5rem 1rem 3rem;
	}

	.pricing-container {
		max-width: 1100px;
		margin: 0 auto;
	}

	.pricing-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.pricing-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--color-base-content, #1f2937);
		margin: 0 0 0.5rem;
	}

	.pricing-subtitle {
		font-size: clamp(0.9375rem, 2vw, 1.125rem);
		color: var(--color-base-content, #4b5563);
		opacity: 0.9;
		max-width: 36rem;
		margin: 0 auto 1.5rem;
		line-height: 1.5;
	}

	.pricing-toggle-wrap {
		display: inline-flex;
		justify-content: center;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		align-items: stretch;
	}

	@media (min-width: 768px) {
		.pricing-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.5rem;
		}
	}

	.pricing-card-wrap {
		position: relative;
	}

	.pricing-card-wrap.highlighted {
		z-index: 1;
	}

	@media (min-width: 768px) {
		.pricing-card-wrap.highlighted :global(.pricing-card) {
			box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
			border: 2px solid var(--color-primary, oklch(0.55 0.2 250));
			transform: scale(1.02);
		}
	}

	.pricing-card-badge {
		position: absolute;
		top: -0.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
	}

	.pricing-card-badge--yearly {
		top: -0.5rem;
		left: auto;
		right: 1rem;
		transform: none;
	}

	.pricing-card-wrap.highlighted .pricing-card-badge--yearly {
		top: 2rem;
	}

	.pricing-card-wrap :global(.pricing-card) {
		transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
	}

	.pricing-card-storage {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-base-content);
	}

	.pricing-card-price {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.pricing-card-price-value {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-base-content);
	}

	.pricing-card-price-suffix {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-base-content);
		opacity: 0.8;
	}

	.pricing-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.pricing-feature {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pricing-feature-icon {
		flex-shrink: 0;
	}

	.pricing-feature-icon.included {
		color: var(--color-success, oklch(0.55 0.2 145));
	}

	.pricing-feature-icon.excluded {
		color: var(--color-base-content);
		opacity: 0.35;
	}

	.pricing-feature-text {
		font-size: 0.9375rem;
	}
</style>
