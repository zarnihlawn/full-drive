<script lang="ts">
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import LucideButterfly from '$lib/component/library/lucide/LucideButterfly.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum.js';
	import { m } from '$lib/paraglide/messages.js';
</script>

<footer class="mt-auto border-t border-base-300 bg-base-100">
	<div
		class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:text-left flex-col text-center"
	>
		<a
			href={WebRoutesEnum.LANDING_PAGE}
			class="inline-flex items-center gap-2 text-base font-semibold text-base-content no-underline hover:text-primary"
		>
			<LucideButterfly className="h-5 w-5 shrink-0" strokeWidth={2.5} />
			<span>{m.full_drive()}</span>
		</a>
		<nav class="flex items-center gap-6 sm:order-none order-2" aria-label="Footer">
			<DaisyUiLink
				href={WebRoutesEnum.DOCUMENTATION}
				className="text-sm text-base-content/80 no-underline hover:opacity-100 hover:text-primary"
			>
				{m.documentation()}
			</DaisyUiLink>
			<DaisyUiLink
				href={WebRoutesEnum.CHANGELOG}
				className="text-sm text-base-content/80 no-underline hover:opacity-100 hover:text-primary"
			>
				{m.changelog()}
			</DaisyUiLink>
			<DaisyUiLink
				href={WebRoutesEnum.PRICING}
				className="text-sm text-base-content/80 no-underline hover:opacity-100 hover:text-primary"
			>
				{m.pricing()}
			</DaisyUiLink>
		</nav>
		<p class="m-0 text-[13px] text-base-content/70 sm:order-none order-3">{m.footer_copyright()}</p>
	</div>
</footer>
