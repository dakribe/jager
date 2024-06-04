import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface DeleteApplicationDialogProps {
  id: string | undefined;
  company: string | undefined;
}

export default function DeleteApplicationDialog({
  id,
  company,
}: DeleteApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync } = api.jobApplication.delete.useMutation({
    onSuccess: () => {
      setOpen(false);
      utils.jobApplication.getAll.invalidate();
      router.push("/applications");
    },
  });

  function handleDelete(id: string) {
    mutateAsync({ id });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="p-1">
        <Button variant="outline" className="inline">
          <Trash className="size-6" onClick={() => setOpen(true)} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <p>
            Are you sure you want to delete job application for{" "}
            <span className="font-bold">{company}?</span>
          </p>
          <div className="flex w-full gap-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(id!)}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
