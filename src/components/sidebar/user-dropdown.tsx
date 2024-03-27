import { LogOutIcon, MoonIcon, SettingsIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface UserDropdownProps {
  name: string | undefined | null;
  image: string | undefined | null;
}

export function UserDropdown({ name, image }: UserDropdownProps) {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-primary-foreground flex items-center justify-between p-2">
        <p>{name}</p>
        <Avatar className="size-6">
          <AvatarImage src={image!} alt="Profile image" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          <MoonIcon className="mr-2 size-4" />
          <span>Toggle theme</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOutIcon className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
