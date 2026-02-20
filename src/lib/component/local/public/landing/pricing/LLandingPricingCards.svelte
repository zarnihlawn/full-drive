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
		if (plan.id === 'payAsYouGo' && plan.usagePriceLine)
			return plan.usagePriceLine;
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

<section
	class="landing-section-pattern px-4 py-10 pb-12"
	aria-labelledby="pricing-title"
>
	<div class="mx-auto max-w-[1100px]">
		<header class="mb-10 text-center">
			<h1
				id="pricing-title"
				class="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-bold tracking-tight text-base-content"
			>
				{m.pricing_title()}
			</h1>
			<p
				class="mx-auto mb-6 max-w-[36rem] text-sm leading-normal text-base-content/90 md:text-lg"
			>
				{m.pricing_subtitle()}
			</p>

			<div class="inline-flex justify-center">
				<DaisyUiJoin className="d-join-sm md:d-join-md">
					<DaisyUiJoinItem>
						<button
							type="button"
							class="d-btn d-join-item w-full d-btn-sm md:min-w-28 md:d-btn-md {billingPeriod ===
							'monthly'
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
							class="d-btn d-join-item w-full d-btn-sm md:min-w-28 md:d-btn-md {billingPeriod ===
							'yearly'
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

		<div class="flex flex-col items-center gap-8 md:block">
			<div
				class="grid w-full grid-cols-1 items-stretch gap-8 md:grid-cols-3"
			>
				{#each PRICING_PLANS.slice(0, 3) as plan (plan.id)}
					{@render card(plan)}
				{/each}
			</div>
			<div
				class="flex w-full flex-col items-center justify-center gap-8 md:mt-10 md:flex-row"
			>
				{#each PRICING_PLANS.slice(3, 5) as plan (plan.id)}
					<article
						class="pricing-card-wrap group relative w-full max-w-[min(100%,22rem)] md:w-[22rem] {plan.highlighted
							? 'md:z-10'
							: ''}"
						class:highlighted={plan.highlighted}
					>
						{@render cardContent(plan)}
					</article>
				{/each}
			</div>
		</div>
		{#snippet card(plan: PricingPlan)}
			<article
				class="pricing-card-wrap group relative {plan.highlighted
					? 'md:z-10'
					: ''}"
				class:highlighted={plan.highlighted}
			>
				{@render cardContent(plan)}
			</article>
		{/snippet}
		{#snippet cardContent(plan: PricingPlan)}
			{#if plan.highlighted}
				<div
					class="absolute -top-2 left-1/2 z-20 -translate-x-1/2"
				>
					<DaisyUiBadge className="d-badge-primary">
						{m.most_popular()}
					</DaisyUiBadge>
				</div>
			{/if}
			{#if billingPeriod === 'yearly' && plan.yearlyBadge}
				<div
					class="absolute -top-2 right-4 z-20 group-[.highlighted]:top-8"
				>
					<DaisyUiBadge
						className="d-badge-success d-badge-sm"
					>
						{plan.yearlyBadge}
					</DaisyUiBadge>
				</div>
			{/if}

			<DaisyUiCard
				className="pricing-card h-full flex flex-col"
			>
				<DaisyUiCardBody
					className="flex flex-1 flex-col gap-4"
				>
					<div>
						<DaisyUiCardBodyTitle
							className="text-xl md:text-2xl"
						>
							{plan.name}
						</DaisyUiCardBodyTitle>
						<p class="mt-1 text-sm text-base-content/70">
							{plan.tagline}
						</p>
					</div>

					<div
						class="text-lg font-semibold text-base-content"
					>
						<span>{plan.storage}</span>
					</div>

					<div class="flex flex-wrap items-baseline gap-1">
						{#if plan.id === 'payAsYouGo'}
							<span
								class="text-lg font-bold tracking-tight text-base-content"
								>{priceDisplay(plan)}</span
							>
						{:else}
							<span
								class="text-3xl font-bold tracking-tight text-base-content"
								>{priceDisplay(plan)}</span
							>
							{#if plan.monthlyPrice !== null && plan.monthlyPrice !== undefined}
								<span
									class="text-base font-medium text-base-content/80"
									>{priceSuffix(plan)}</span
								>
							{/if}
						{/if}
					</div>

					<ul
						class="m-0 flex list-none flex-col gap-2.5 p-0"
						role="list"
					>
						{#each plan.features as feature (feature.text)}
							<li class="flex items-center gap-2">
								{#if feature.included}
									<span
										class="shrink-0 text-success"
										aria-hidden="true"
									>
										<LucideCircleCheck
											className="size-5 shrink-0"
										/>
									</span>
								{:else}
									<span
										class="shrink-0 text-base-content/35"
										aria-hidden="true"
									>
										<LucideCircleX
											className="size-5 shrink-0"
										/>
									</span>
								{/if}
								<span
									class="text-[0.9375rem]"
									class:opacity-60={!feature.included}
								>
									{feature.text}
								</span>
							</li>
						{/each}
					</ul>

					<div class="mt-auto pt-2">
						<DaisyUiLink
							href={plan.ctaHref}
							className="d-btn d-btn-block {plan.ctaVariant ===
							'primary'
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
		{/snippet}
	</div>
</section>
