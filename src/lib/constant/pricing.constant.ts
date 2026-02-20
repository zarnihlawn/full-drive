/**
 * Pricing plan IDs aligned with subscription.planTier in DB where applicable.
 * payAsYouGo = usage-based billing (no fixed monthly/yearly).
 */
export type PlanId = 'free' | 'starter' | 'pro' | 'team' | 'payAsYouGo';

export interface PricingFeature {
	/** Message key or raw text */
	text: string;
	/** If true, render as included check; if false, as disabled/cross. */
	included: boolean;
}

export interface PricingPlan {
	id: PlanId;
	/** Plan display name (e.g. "Free", "Pro", "Pay as you go") */
	name: string;
	/** Storage amount shown on card (e.g. "5 GB", "100 GB", "As you need") */
	storage: string;
	/** Monthly price in USD; null = free or usage-based */
	monthlyPrice: number | null;
	/** Yearly price in USD (total); null = free or usage-based */
	yearlyPrice: number | null;
	/** For pay-as-you-go: short price line (e.g. "From $0.02/GB") */
	usagePriceLine?: string;
	/** Short tagline */
	tagline: string;
	/** Bullet list for the card */
	features: PricingFeature[];
	/** CTA label */
	ctaLabel: string;
	/** CTA href */
	ctaHref: string;
	/** Primary CTA style */
	ctaVariant: 'primary' | 'secondary' | 'ghost';
	/** Highlight this card (e.g. "Most popular") */
	highlighted: boolean;
	/** Optional badge text when yearly is selected */
	yearlyBadge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: 'free',
		name: 'Free',
		storage: '5 GB',
		monthlyPrice: 0,
		yearlyPrice: 0,
		tagline: 'For trying out and small projects',
		features: [
			{ text: '5 GB storage', included: true },
			{ text: 'Up to 3 team members', included: true },
			{ text: 'Basic API access', included: true },
			{ text: 'Email support', included: true },
			{ text: 'Advanced analytics', included: false },
			{ text: 'Priority support', included: false },
			{ text: 'SSO / SAML', included: false },
		],
		ctaLabel: 'Get started free',
		ctaHref: '/auth/signnup',
		ctaVariant: 'secondary',
		highlighted: false,
	},
	{
		id: 'starter',
		name: 'Starter',
		storage: '20 GB',
		monthlyPrice: 5,
		yearlyPrice: 50,
		tagline: 'For individuals and small teams',
		features: [
			{ text: '20 GB storage', included: true },
			{ text: 'Up to 5 team members', included: true },
			{ text: 'Basic API access', included: true },
			{ text: 'Email support', included: true },
			{ text: 'Advanced analytics', included: false },
			{ text: 'Priority support', included: false },
			{ text: 'SSO / SAML', included: false },
		],
		ctaLabel: 'Get started',
		ctaHref: '/auth/signnup',
		ctaVariant: 'secondary',
		highlighted: false,
		yearlyBadge: 'Save 17%',
	},
	{
		id: 'pro',
		name: 'Pro',
		storage: '100 GB',
		monthlyPrice: 12,
		yearlyPrice: 108,
		tagline: 'For growing teams and heavier usage',
		features: [
			{ text: '100 GB storage', included: true },
			{ text: 'Up to 15 team members', included: true },
			{ text: 'Full API access', included: true },
			{ text: 'Email support', included: true },
			{ text: 'Advanced analytics', included: true },
			{ text: 'Priority support', included: true },
			{ text: 'SSO / SAML', included: false },
		],
		ctaLabel: 'Start free trial',
		ctaHref: '/auth/signnup',
		ctaVariant: 'primary',
		highlighted: true,
		yearlyBadge: 'Save 25%',
	},
	{
		id: 'team',
		name: 'Team',
		storage: '500 GB',
		monthlyPrice: 29,
		yearlyPrice: 290,
		tagline: 'For larger teams and departments',
		features: [
			{ text: '500 GB storage', included: true },
			{ text: 'Up to 50 team members', included: true },
			{ text: 'Full API + webhooks', included: true },
			{ text: 'Email support', included: true },
			{ text: 'Advanced analytics', included: true },
			{ text: 'Priority support', included: true },
			{ text: 'SSO / SAML', included: false },
		],
		ctaLabel: 'Start free trial',
		ctaHref: '/auth/signnup',
		ctaVariant: 'secondary',
		highlighted: false,
		yearlyBadge: 'Save 17%',
	},
	{
		id: 'payAsYouGo',
		name: 'Pay as you go',
		storage: 'As you need',
		monthlyPrice: null,
		yearlyPrice: null,
		usagePriceLine: 'From $0.02/GB after free tier',
		tagline: 'No commitment. Scale up or down anytime.',
		features: [
			{ text: 'Overage billed per GB', included: true },
			{ text: 'Unlimited team members', included: true },
			{ text: 'Full API + webhooks', included: true },
			{ text: 'Email support', included: true },
			{ text: 'Advanced analytics', included: true },
			{ text: 'Priority support', included: true },
			{ text: 'SSO / SAML', included: true },
		],
		ctaLabel: 'Start building',
		ctaHref: '/auth/signnup',
		ctaVariant: 'secondary',
		highlighted: false,
	},
];
