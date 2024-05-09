import Link from "next/link";
import UserCardDropdown from "./UserCardDropdown";
import NewApplicationDialog from "./NewApplicationDialog";

export default function Sidebar() {
  return (
    <div className="min-h-dvh w-[300px] border-r p-4">
      <div className="flex flex-col gap-4">
        <UserCardDropdown />
        <NewApplicationDialog />
        <div>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/applications">Applications</Link>
        </div>
      </div>
    </div>
  );
}
