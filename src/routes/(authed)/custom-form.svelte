<script lang="ts">
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { createApplicationSchema, type CreateApplicationSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Input } from '@/components/ui/input';
	import Button from '@/components/ui/button/button.svelte';
	import { cn } from '@/utils';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';

	let { form: data }: { form: SuperValidated<Infer<CreateApplicationSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(createApplicationSchema)
	});

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	$effect(() => {
		value = $formData.appliedDate ? parseDate($formData.appliedDate) : undefined;
	});

	let value = $state<DateValue | undefined>();

	let placeholder = $state(today(getLocalTimeZone()));

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="/home?/createApplication">
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Title</Form.Label>
				<Input {...props} bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.Description>Job title</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="company">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Company</Form.Label>
				<Input {...props} bind:value={$formData.company} />
			{/snippet}
		</Form.Control>
		<Form.Description>Company name</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="status">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Status</Form.Label>
				<Select.Root type="single" bind:value={$formData.status} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.status ? $formData.status : 'Status'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="Applied" label="Applied" />
						<Select.Item value="Accepted" label="Accepted" />
						<Select.Item value="Rejected" label="Rejected" />
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="appliedDate" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Applied Date</Form.Label>
				<Popover.Root>
					<Popover.Trigger {...props}>
						{#snippet child({ props })}
							<Button
								variant="outline"
								class={cn('w-[280px] justify-start pl-4 text-left font-normal')}
								{...props}
							>
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							{value}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Date of birth"
							onValueChange={(v) => {
								if (v) {
									$formData.appliedDate = v.toString();
								} else {
									$formData.appliedDate = '';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden value={$formData.appliedDate} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
