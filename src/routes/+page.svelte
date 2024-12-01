<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>
	{data.user?.email}
</p>

<form method="POST" action="?logout">
	<Button on:click>Sign out</Button>
</form>
