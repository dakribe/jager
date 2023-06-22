import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

export default function User() {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Menu shadow="md" width={200} position="top-start">
        <Menu.Target>
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar src={sessionData?.user?.image ?? ""} radius="xl" />
              <Box sx={{ flex: 1 }}>
                <Text size="md" weight={500}>
                  {sessionData?.user?.name}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => signOut()}>Sign Out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
