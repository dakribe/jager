<script lang="ts">
	import CustomForm from './custom-form.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	const { data, children } = $props();
</script>

<div class="mx-auto max-w-[80%]">
	<Toaster />
	<CustomForm form={data.form} />
	{@render children()}
</div>
