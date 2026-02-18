<script>
	import DaisyUiCardBodyAction from '$lib/component/library/daisyui/card/body/action/DaisyUiCardBodyAction.svelte';
	import DaisyUiCardBody from '$lib/component/library/daisyui/card/body/DaisyUiCardBody.svelte';
	import DaisyUiCardBodyTitle from '$lib/component/library/daisyui/card/body/title/DaisyUiCardBodyTitle.svelte';
	import DaisyUiCard from '$lib/component/library/daisyui/card/DaisyUiCard.svelte';
	import DaisyUiLink from '$lib/component/library/daisyui/link/DaisyUiLink.svelte';
</script>

<div class="">
	<DaisyUiCard>
		<DaisyUiCardBody>
			<DaisyUiCardBodyTitle>Hello</DaisyUiCardBodyTitle>
			<DaisyUiCardBodyAction>
				<DaisyUiLink className="d-btn d-btn-ghost">
					Contact Us
				</DaisyUiLink>
				<DaisyUiLink className="d-btn d-btn-primary">
					Purchase
				</DaisyUiLink>
			</DaisyUiCardBodyAction>
		</DaisyUiCardBody>
	</DaisyUiCard>
</div>
