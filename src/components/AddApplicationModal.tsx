import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddApplicationForm from "./AddApplicationForm";

export default function AddApplicationModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add application">
        <AddApplicationForm />
      </Modal>
      <Button color="orange.7" onClick={open}>
        Add Application
      </Button>
    </>
  );
}
