import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Header() {
  const { data: sessionData } = useSession();

  return (
    <header className="h-12 w-screen border-b-2 border-border">
      <div className="flex items-center justify-between px-6 pt-2.5">
        <h1 className="font-semibold">Job Application Tracker</h1>
        {sessionData ? (
          <div className="flex h-6 items-center gap-2">
            <p>{sessionData.user.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger aschild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={sessionData.user.image} />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end" forceMount>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span onClick={() => signOut()}>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button size="sm" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
