<script lang="ts">
	import CustomForm from './custom-form.svelte';

	const { data, children } = $props();
</script>

<div class="mx-auto max-w-[80%]">
	<CustomForm form={data.form} />
	{@render children()}
</div>
