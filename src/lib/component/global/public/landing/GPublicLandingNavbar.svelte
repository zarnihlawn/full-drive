<script>
	import DaisyUiButton from '$lib/component/library/daisyui/button/DaisyUiButton.svelte';
	import DaisyUiDropdownButton from '$lib/component/library/daisyui/dropdown/button/DaisyUiDropdownButton.svelte';
	import DaisyUiDropdownContent from '$lib/component/library/daisyui/dropdown/content/DaisyUiDropdownContent.svelte';
	import DaisyUiDropdown from '$lib/component/library/daisyui/dropdown/DaisyUiDropdown.svelte';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
	import DaisyUiNavbarCenter from '$lib/component/library/daisyui/navbar/center/DaisyUiNavbarCenter.svelte';
	import DaisyUiNavbar from '$lib/component/library/daisyui/navbar/DaisyUiNavbar.svelte';
	import DaisyUiNavbarEnd from '$lib/component/library/daisyui/navbar/end/DaisyUiNavbarEnd.svelte';
	import DaisyUiNavbarStart from '$lib/component/library/daisyui/navbar/start/DaisyUiNavbarStart.svelte';
	import LucideBell from '$lib/component/library/lucide/LucideBell.svelte';
	import LucideButterfly from '$lib/component/library/lucide/LucideButterfly.svelte';
	import { WebRoutesEnum } from '$lib/model/enum/routes.enum';
	import { m } from '$lib/paraglide/messages.js';
</script>

<DaisyUiNavbar>
	<DaisyUiNavbarStart>
		<DaisyUiDropdown className="lg:hidden">
			<DaisyUiDropdownButton>
				<LucideBell />
			</DaisyUiDropdownButton>
			<DaisyUiDropdownContent className="text-left">
				<DaisyUiLink
					href={WebRoutesEnum.DOCUMENTATION}
					className="d-btn d-btn-ghost text-left"
				>
					{m.documentation()}
				</DaisyUiLink>
				<DaisyUiLink
					href={WebRoutesEnum.CHANGELOG}
					className="d-btn d-btn-ghost"
				>
					{m.changelog()}
				</DaisyUiLink>
				<DaisyUiLink
					href={WebRoutesEnum.PRICING}
					className="d-btn d-btn-ghost"
				>
					{m.pricing()}
				</DaisyUiLink>
			</DaisyUiDropdownContent>
		</DaisyUiDropdown>
		<DaisyUiLink
			className="d-btn d-btn-ghost text-xl items-center gap-2"
			href={WebRoutesEnum.LANDING_PAGE}
		>
			<LucideButterfly strokeWidth={3} />
			{m.full_drive()}
		</DaisyUiLink>
	</DaisyUiNavbarStart>

	<DaisyUiNavbarCenter className="gap-2 hidden lg:flex">
		<DaisyUiLink
			href={WebRoutesEnum.DOCUMENTATION}
			className="d-btn d-btn-ghost
			">{m.documentation()}</DaisyUiLink
		>
		<DaisyUiLink
			href={WebRoutesEnum.CHANGELOG}
			className="d-btn d-btn-ghost
			">{m.changelog()}</DaisyUiLink
		>
		<DaisyUiLink
			href={WebRoutesEnum.PRICING}
			className="d-btn d-btn-ghost
			">{m.pricing()}</DaisyUiLink
		>
	</DaisyUiNavbarCenter>

	<DaisyUiNavbarEnd className="gap-3">
		<DaisyUiLink
			className="d-btn d-btn-ghost"
			href={WebRoutesEnum.LOGIN}
		>
			{m.log_in()}
		</DaisyUiLink>
		<DaisyUiLink
			className="d-btn d-btn-primary"
			href={WebRoutesEnum.SIGNUP}
		>
			{m.sign_up()}
		</DaisyUiLink>
	</DaisyUiNavbarEnd>
</DaisyUiNavbar>
