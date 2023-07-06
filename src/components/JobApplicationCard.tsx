import { Badge } from "./ui/badge";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ApplicationCardOptions from "./ApplicationCardOptions";

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
        <ApplicationCardOptions />
      </CardContent>
    </Card>
  );
}
