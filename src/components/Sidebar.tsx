import { Flex, NavLink } from "@mantine/core";
import Link from "next/link";
import { Newspaper, House } from "@phosphor-icons/react";

export default function Sidebar() {
  return (
    <Flex direction="column" mt="md">
      <Link
        style={{
          textDecoration: "none",
        }}
        href="/dashboard"
      >
        <NavLink label="Home" icon={<House />} />
      </Link>
      <Link style={{ textDecoration: "none" }} href="/applications">
        <NavLink label="Applications" icon={<Newspaper />} />
      </Link>
    </Flex>
  );
}
