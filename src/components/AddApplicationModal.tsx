import AddApplicationForm from "./AddApplicationForm";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function AddApplicationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-5 w-5" />
          Add application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
        </DialogHeader>
        <AddApplicationForm />
      </DialogContent>
    </Dialog>
  );
}
