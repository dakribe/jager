import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "~/utils/api";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface UpdateStatusFormProps {
  id: number;
  originalStatus: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = zod.object({
  status: zod.string(),
});

export default function UpdateStatusForm({
  id,
  originalStatus,
  setOpen,
}: UpdateStatusFormProps) {
  const utils = api.useContext();

  const { mutate: updateApplication } =
    api.jobApplication.updateApplicationStatus.useMutation({
      onSuccess() {
        utils.jobApplication.getAll.invalidate();
        utils.jobApplication.getLatest.invalidate();
        toast({
          title: "Application Updated",
        });
      },
    });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: originalStatus,
    },
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    updateApplication({ id, status: values.status });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={originalStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interviewing">Interviewing</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
