<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>{data.application.company}</h1>
<p>{data.application.title}</p>
