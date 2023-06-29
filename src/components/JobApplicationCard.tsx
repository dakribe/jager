import { Badge } from "./ui/badge";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface JobApplicationCardProps {
  companyName: string;
  jobTitle: string;
  appliedDate: Date;
  status: string;
  notes: string | null;
}

export default function JobApplicationCard({
  companyName,
  jobTitle,
  notes,
  status,
  appliedDate,
}: JobApplicationCardProps) {
  return (
    <Card className="h-40 w-80 bg-secondary">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{companyName}</CardTitle>
          <Badge>{status}</Badge>
        </div>
        <CardDescription>{jobTitle}</CardDescription>
        <CardDescription>
          <Moment fromNow>{appliedDate}</Moment>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{notes}</p>
      </CardContent>
    </Card>
  );
}
