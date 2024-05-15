import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface DeleteApplicationDialogProps {
  id: string | undefined;
}

export default function DeleteApplicationDialog({
  id,
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
      <DialogTrigger asChild className="py-1">
        <Button variant="outline" className="inline">
          <Trash onClick={() => setOpen(true)} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <Button>Cancel</Button>
          <Button variant="destructive" onClick={() => handleDelete(id!)}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
