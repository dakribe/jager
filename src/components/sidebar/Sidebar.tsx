import Link from "next/link";
import UserCardDropdown from "./UserCardDropdown";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Layers, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { useApplicationDialogContext } from "~/context/NewApplicationDialogContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const sidebarItems = [
  {
    group: "Applications",
    items: [
      {
        link: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard />,
      },
      {
        link: "/applications",
        label: "Applications",
        icon: <Layers />,
      },
    ],
  },
];

export default function Sidebar() {
  const { setOpen } = useApplicationDialogContext();
  return (
    <div className="min-h-dvh w-[300px] border-r p-4">
      <div className="flex flex-col gap-4">
        <UserCardDropdown />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOpen(true)}>New Application</Button>
            </TooltipTrigger>
            <TooltipContent side="right">N</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {sidebarItems.map((group) => (
              <CommandGroup key={group.group} heading={group.group}>
                {group.items.map((item) => (
                  <Link href={item.link}>
                    <CommandItem
                      key={item.label}
                      className="flex gap-2 hover:cursor-pointer"
                    >
                      {item.icon}
                      {item.label}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
