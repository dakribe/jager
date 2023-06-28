import Link from "next/link";
import { Newspaper, House } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import AddApplicationModal from "./AddApplicationModal";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-72 border-primary border-r-2">
      <h1 className="p-4 text-2xl font-medium border-primary border-b-2">
        Job Application Tracker
      </h1>
      <div className="flex flex-col p-2 gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <House size={40} className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/applications">
          <Button variant="ghost" className="w-full justify-start">
            <Newspaper size={52} className="mr-2 h-4 w-4" />
            Applications
          </Button>
        </Link>
        <AddApplicationModal />
      </div>
    </div>
  );
}
