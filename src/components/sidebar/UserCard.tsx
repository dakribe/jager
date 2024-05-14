import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function UserCard() {
  const { data: sessionData } = useSession();

  return (
    <div className="hover:bg-secondary rounded-md p-1 hover:cursor-pointer">
      <div className="flex items-center gap-2">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src={sessionData?.user.image!} />
        </Avatar>
        <p>{sessionData?.user.name}</p>
      </div>
    </div>
  );
}
