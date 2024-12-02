<script lang="ts">
	import type { PageData } from './$types';
	import Button from '@/components/ui/button/button.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1>{data.application.company}</h1>
<p>{data.application.title}</p>

<form method="POST" action="?/delete">
	<Button type="submit" variant="destructive">Delete</Button>
</form>
