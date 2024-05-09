import { useState } from "react";
import NewApplicationForm from "./NewApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function NewApplicationDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">Open</DialogTrigger>
      <DialogContent>
        <NewApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
