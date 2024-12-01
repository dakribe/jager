<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	import CustomForm from './custom-form.svelte';

	const { data, children } = $props();
</script>

<div class="mx-auto max-w-[80%]">
	<CustomForm form={data.form} />
	<SuperDebug data={data.form} />
	{@render children()}
</div>
