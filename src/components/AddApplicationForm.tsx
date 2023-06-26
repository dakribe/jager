import { Box, Button, Flex, TextInput, Textarea } from "@mantine/core";
import { useZodForm } from "~/hooks/useZodForm";
import { z } from "zod";
import { api } from "~/utils/api";

const schema = z.object({
  companyName: z.string(),
  jobTitle: z.string(),
  status: z.string(),
  note: z.string(),
});

export default function AddApplicationForm() {
  const utils = api.useContext();

  const { mutateAsync } = api.jobApplication.create.useMutation({
    onSuccess() {
      utils.jobApplication.getAll.invalidate();
    },
  });

  const { register, handleSubmit, reset } = useZodForm({
    schema,
  });

  function handleAddApplication(data: z.infer<typeof schema>) {
    console.log(data);
    console.log(data.companyName);
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
            {...register("companyName")}
          />
          <TextInput
            label="Title"
            required
            placeholder="Title"
            {...register("jobTitle")}
          />
          <TextInput
            label="Status"
            required
            placeholder="Status"
            {...register("status")}
          />
          <Textarea label="Notes" placeholder="Notes" {...register("note")} />
          <Button type="submit" color="orange.7">
            Create
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
