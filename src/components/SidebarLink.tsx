import Link from "next/link";
import { Button } from "./ui/button";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  location: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function SidebarLink({
  icon,
  label,
  location,
  variant,
}: SidebarLinkProps) {
  return (
    <Link href={location}>
      <Button className="flex w-full justify-start space-x-4" variant={variant}>
        {icon}
        <p>{label}</p>
      </Button>
    </Link>
  );
}
