<script lang="ts">
	import { Button } from '@/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>
	{data.user?.email}
</p>

<form method="POST" action="?logout">
	<Button type="submit">Sign out</Button>
</form>
