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

interface JobApplicationCardProps {
  id: number;
  companyName: string;
  jobTitle: string;
  appliedDate: Date;
  status: string;
}

export default function JobApplicationCard({
  id,
  companyName,
  jobTitle,
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
    <Card className="w-80" onClick={() => deleteApplication({ id })}>
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
