import Link from "next/link";
import UserCardDropdown from "./UserCardDropdown";

export default function Sidebar() {
  return (
    <div className="min-h-dvh w-[300px] border-r p-4">
      <UserCardDropdown />
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/applications">Applications</Link>
    </div>
  );
}
