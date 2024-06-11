import { useEffect } from "react";
import NewApplicationForm from "./NewApplicationForm";
import { Dialog, DialogContent } from "../ui/dialog";

interface NewApplicationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewApplicationDialog({
  open,
  setOpen,
}: NewApplicationDialogProps) {
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
      <DialogContent>
        <NewApplicationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
