import {
  AppShell,
  Box,
  Burger,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import User from "./User";
import NavLinks from "./NavLinks";

interface IndexLayoutProps {
  children?: React.ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      padding="md"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section>
            <Box>
              <Text>Job Application Tracker</Text>
            </Box>
          </Navbar.Section>
          <Navbar.Section grow>
            <NavLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
