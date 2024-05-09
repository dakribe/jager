import NewApplicationForm from "./NewApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function NewApplicationDialog() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">Open</DialogTrigger>
      <DialogContent>
        <NewApplicationForm />
      </DialogContent>
    </Dialog>
  );
}
