import { useSession } from "next-auth/react";
import { UserDropdown } from "./user-dropdown";
import { ApplicationDialog } from "./application-dialog";

export default function Sidebar() {
  const { data: sessionData } = useSession();
  return (
    <div className="border-muted 0 h-full w-64 shrink border-r-2 p-1">
      <div className="mt-4 flex h-full flex-col p-2">
        <UserDropdown
          name={sessionData?.user.name}
          image={sessionData?.user.image}
        />
        <ApplicationDialog />
      </div>
    </div>
  );
}
