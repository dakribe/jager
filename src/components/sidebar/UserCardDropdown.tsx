import { signOut } from "next-auth/react";
import UserCard from "./UserCard";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserCardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <UserCard />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-54">
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>
            <Link href="/settings">Settings</Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span onClick={() => signOut({ callbackUrl: "/" })}>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
