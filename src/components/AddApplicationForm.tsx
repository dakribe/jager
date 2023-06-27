import { Box, Button, Flex, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useZodForm } from '~/hooks/useZodForm';
import { z } from 'zod';
import { api } from '~/utils/api';
import { useState } from 'react';

const schema = z.object({
    companyName: z.string(),
    jobTitle: z.string(),
    appliedDate: z.date(),
    status: z.string(),
    note: z.string(),
});

export default function AddApplicationForm() {
    const utils = api.useContext();

    const [appliedDate, setAppliedDate] = useState<Date>();

    const { mutateAsync } = api.jobApplication.create.useMutation({
        onSuccess() {
            utils.jobApplication.getAll.invalidate();
        },
    });

    const { register, handleSubmit, reset } = useZodForm({
        schema,
    });

    function onDateChange(date: Date) {
        setAppliedDate(date);
    }

    function handleAddApplication(data: z.infer<typeof schema>) {
        console.log(data);
        mutateAsync(data);
        reset();
    }

    return (
        <Box>
            <form onSubmit={handleSubmit((data) => handleAddApplication(data))}>
                <Flex direction="column" gap="sm">
                    <TextInput
                        label="Company"
                        required
                        placeholder="Company"
                        {...register('companyName')}
                    />
                    <TextInput
                        label="Title"
                        required
                        placeholder="Title"
                        {...register('jobTitle')}
                    />
                    <DateInput
                        label="Applied Date"
                        type="default"
                        maxDate={new Date()}
                        placeholder="Date"
                        value={appliedDate}
                        {...register('appliedDate')}
                        onChange={(value) => onDateChange(value)}
                    />
                    <TextInput
                        label="Status"
                        required
                        placeholder="Status"
                        {...register('status')}
                    />
                    <Textarea
                        label="Notes"
                        placeholder="Notes"
                        {...register('note')}
                    />
                    <Button type="submit" color="orange.7">
                        Create
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}
