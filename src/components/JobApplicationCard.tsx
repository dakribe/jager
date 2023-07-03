import { Badge } from "./ui/badge";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { api } from "~/utils/api";
import { MoreHorizontal, Pencil, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface JobApplicationCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string | null;
  appliedDate: Date;
  status: string;
}

export default function JobApplicationCard({
  id,
  companyName,
  jobTitle,
  location,
  status,
  appliedDate,
}: JobApplicationCardProps) {
  const utils = api.useContext();
  const { mutate: deleteApplication } = api.jobApplication.delete.useMutation({
    onSuccess() {
      utils.jobApplication.getAll.invalidate();
    },
  });

  return (
    <Card className="w-80 h-40">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{companyName}</CardTitle>
          <Badge>{status}</Badge>
        </div>
        <CardDescription>
          {jobTitle}
          {location ? <p>{location}</p> : <p>No location</p>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <Moment fromNow>{appliedDate}</Moment>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400"
              onClick={() => deleteApplication({ id })}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
