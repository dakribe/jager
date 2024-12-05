<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns, type JobApplication } from './columns.js';

	interface Props {
		user?: {
			id: string;
			email: string | null;
		} | null;
		applications?: JobApplication[];
	}

	let { data }: { data: Props } = $props();
</script>

<h1>Home</h1>
{data?.user?.email}

<DataTable data={data?.applications ?? []} {columns} />
