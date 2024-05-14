import { useEffect, useState } from "react";
import NewApplicationForm from "./NewApplicationForm";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

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
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild className="w-full py-1">
            <TooltipTrigger asChild>
              <Button>New Application</Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="bottom">N</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <NewApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
