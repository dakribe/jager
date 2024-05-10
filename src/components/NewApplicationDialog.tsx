import { useEffect, useState } from "react";
import NewApplicationForm from "./NewApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function NewApplicationDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "n") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">Open</DialogTrigger>
      <DialogContent>
        <NewApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
