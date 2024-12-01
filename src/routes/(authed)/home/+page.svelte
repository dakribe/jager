<script lang="ts">
	import { Button } from '@/components/ui/button';

	let { data } = $props();
</script>

<h1>Home</h1>
{data.user?.email}
<form method="POST" action="?/logout">
	<Button type="submit">Sign Out</Button>
</form>
