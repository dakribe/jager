import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

const NewApplicationSchema = z.object({
  company: z.string().min(2).max(28),
  jobTitle: z.string().min(2).max(28),
  status: z.string().min(2).max(28),
  location: z.string().min(2).max(28),
  dateApplied: z.date(),
});

export default function NewApplicationForm() {
  const queryClient = useQueryClient();
  const createApplicationForm = useForm({
    resolver: zodResolver(NewApplicationSchema),
    defaultValues: {
      company: "",
      jobTitle: "",
      status: "",
      location: "",
      dateApplied: new Date(),
    },
  });

  const createApplicationKey = getQueryKey(api.jobApplication.create);

  const { mutateAsync } = api.jobApplication.create.useMutation({
    onMutate: async (newApplication) => {
      await queryClient.cancelQueries({ queryKey: createApplicationKey });

      const previousApplications =
        queryClient.getQueryData(createApplicationKey);

      if (previousApplications) {
        queryClient.setQueryData(createApplicationKey, {
          ...previousApplications,
          newApplication,
        });
      }

      return { previousApplications };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        createApplicationKey,
        context?.previousApplications,
      );
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: createApplicationKey });
    },
  });

  function onSubmit(values: z.infer<typeof NewApplicationSchema>) {
    mutateAsync(values);
  }

  return (
    <Form {...createApplicationForm}>
      <form
        onSubmit={createApplicationForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={createApplicationForm.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Apple" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createApplicationForm.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createApplicationForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Remote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createApplicationForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="field.value">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Applied" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createApplicationForm.control}
          name="dateApplied"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Applied</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" onSubmit={() => console.log("Button hit")}>
          Create
        </Button>
      </form>
    </Form>
  );
}
