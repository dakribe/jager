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
}

export default function JobApplicationCard({
  companyName,
  jobTitle,
  status,
  appliedDate,
}: JobApplicationCardProps) {
  return (
    <Card className="w-80">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{companyName}</CardTitle>
          <Badge>{status}</Badge>
        </div>
        <CardDescription>{jobTitle}</CardDescription>
      </CardHeader>
      <CardContent className="font-normal">
        <Moment fromNow>{appliedDate}</Moment>
      </CardContent>
    </Card>
  );
}
