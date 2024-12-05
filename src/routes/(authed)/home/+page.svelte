<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns, type JobApplication } from './columns.js';

	interface Props {
		user?: {
			id: string;
			email: string | null;
			name: string;
		} | null;
		applications?: JobApplication[];
	}

	let { data }: { data: Props } = $props();
</script>

{data?.user?.name}

<DataTable data={data?.applications ?? []} {columns} />
