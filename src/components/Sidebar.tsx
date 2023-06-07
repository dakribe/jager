import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Home, ScrollTextIcon } from "lucide-react";

interface SidebarProps {
  items: {
    title: string;
    href: string;
  };
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-60 border-r-2 border-border">
      <div className="ml-4 flex w-40 flex-col items-start">
        <Button variant={"ghost"} className="mb-2">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant={"ghost"}>
          <ScrollTextIcon className="mr-2 h-4 w-4" />
          Applications
        </Button>
      </div>
    </div>
  );
}
