import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function User() {
  const { data: sessionData } = useSession();
  const fallbackInitials = sessionData?.user.name?.slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={sessionData?.user.image!} />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
