import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";

const LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Applications",
    href: "/applications",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-60 border-r-2 border-border">
      <div className="ml-4 mt-8 flex w-40 flex-col items-start">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === link.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "w-full justify-start"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
