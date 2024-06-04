import { createContext, useContext, useState } from "react";
import NewApplicationDialog from "~/components/sidebar/NewApplicationDialog";

type ApplicationDialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ApplicationDialogContext =
  createContext<null | ApplicationDialogContextType>(null);

type ApplicationDialogProviderProps = {
  children: React.ReactNode;
};

export function ApplicationDialogProvider({
  children,
}: ApplicationDialogProviderProps) {
  const [open, setOpen] = useState(false);

  return (
    <ApplicationDialogContext.Provider value={{ open, setOpen }}>
      <NewApplicationDialog open={open} setOpen={setOpen} />
      {children}
    </ApplicationDialogContext.Provider>
  );
}

export function useApplicationDialogContext() {
  const context = useContext(ApplicationDialogContext);
  if (!context) {
    throw new Error(
      "useApplicationDialogContext must be used within a ApplicationDialogContextProvider",
    );
  }
  return context;
}
