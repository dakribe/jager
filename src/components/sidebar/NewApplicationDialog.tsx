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
        const activeElement = document.activeElement as HTMLElement;
        const isInputFocused =
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.isContentEditable);

        if (!isInputFocused && !open) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild className="w-full py-1">
            <TooltipTrigger asChild>
              <Button>New Application</Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="right">N</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <NewApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
