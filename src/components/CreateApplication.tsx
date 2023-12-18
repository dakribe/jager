import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function CreateApplication() {
  const [title, setTitle] = useState("");
  const { mutateAsync } = api.jobApplication.create.useMutation();

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    mutateAsync({ title });
  }

  return (
    <div>
      <form onSubmit={(e) => handleCreate(e)}>
        <Input onInput={(e) => setTitle(e.currentTarget.value)} />
        <Button>Add</Button>
      </form>
      {title}
    </div>
  );
}
