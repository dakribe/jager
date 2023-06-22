import { Group, Text, UnstyledButton } from "@mantine/core";
import { Plus } from "lucide-react";

const data = [
  {
    icon: <Plus />,
    label: "Add Application",
  },
];

export default function NavLinks() {
  return (
    <div>
      {data.map((link) => (
        <UnstyledButton key={link.label}>
          <Group>
            {link.icon}
            <Text size="sm">{link.label}</Text>
          </Group>
        </UnstyledButton>
      ))}
    </div>
  );
}
