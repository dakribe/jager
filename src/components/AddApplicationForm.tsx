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

    return <div></div>;
}
