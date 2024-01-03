import { useSession } from "next-auth/react";
import { ClipboardEdit, HomeIcon, UserIcon } from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { data: sessionData } = useSession();
  return (
    <div className="h-full w-72 shrink-0 bg-black">
      <div className="flex flex-col space-y-2 p-4">
        <SidebarLink
          location=""
          variant="ghost"
          label={sessionData?.user.name!}
          icon={<UserIcon />}
        ></SidebarLink>
        <SidebarLink
          icon={<ClipboardEdit />}
          label="New Application"
          location=""
        />
        <SidebarLink
          icon={<HomeIcon />}
          label="Home"
          location="/home"
          variant="ghost"
        />
      </div>
    </div>
  );
}
