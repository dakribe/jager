import { signOut } from "next-auth/react";
import UserCard from "./UserCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserCardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <UserCard />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <span onClick={() => signOut({ callbackUrl: "/" })}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
