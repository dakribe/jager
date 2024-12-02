<script lang="ts">
	import CustomForm from './custom-form.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Toolbar from '@/components/toolbar.svelte';

	const { data, children } = $props();
</script>

<div class="mx-auto mt-12 max-w-[80%]">
	<Toaster />
	<CustomForm form={data.form} />
	{@render children()}
	<Toolbar />
</div>
