import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Pencil, TrashIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import UpdateStatusForm from "./UpdateStatusForm";

interface CardOptionsProps {
  id: number;
  status: string;
}

export default function ApplicationCardOptions({
  id,
  status,
}: CardOptionsProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const utils = api.useContext();

  const { mutate: deleteApplication } = api.jobApplication.delete.useMutation({
    onSuccess() {
      utils.jobApplication.getAll.invalidate();
      utils.jobApplication.getLatest.invalidate();
      toast({
        title: "Application Removed",
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Update</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-red-400"
            onClick={() => deleteApplication({ id })}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
        </DialogHeader>
        <UpdateStatusForm id={id} originalStatus={status} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
