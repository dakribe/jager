<script lang="ts">
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<h1>Home</h1>
{data?.user?.email}
{#if data.applications && data.applications.length > 0}
	{#each data.applications as app}
		<p>{app.title}</p>
	{/each}
{:else}
	<p>No applications found</p>
{/if}
