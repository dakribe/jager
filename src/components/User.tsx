import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function User() {
  const { data: sessionData } = useSession();
  const fallbackInitials = sessionData?.user.name?.slice(0, 2);

  return (
    <Button variant="ghost" className="p-6">
      <Avatar>
        <AvatarImage src={sessionData?.user.image} />
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
      </Avatar>
      <p className="ml-4 font-medium">{sessionData?.user.name}</p>
    </Button>
  );
}
