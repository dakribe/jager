<script lang="ts">
	import House from 'lucide-svelte/icons/house';
	import ChartNoAxesColumn from 'lucide-svelte/icons/chart-no-axes-column';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<div
	class="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4 rounded-3xl border border-white/50 bg-zinc-700 px-6 py-2"
>
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={200}>
			<Tooltip.Trigger>
				<a href="/home" class="hover:text-zinc-300">
					<House size="32" />
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content sideOffset={10}>
				<p>Home</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={200}>
			<Tooltip.Trigger>
				<a href="/analytics" class="hover:text-zinc-300">
					<ChartNoAxesColumn size="32" />
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content sideOffset={10}>
				<p>Analytics</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={200}>
			<Tooltip.Trigger>
				<a href="/settings" class="hover:text-zinc-300">
					<Settings size="32" />
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content sideOffset={10}>
				<p>Settings</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
