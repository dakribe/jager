import { Badge } from "./ui/badge";
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
  status: string;
  notes: string | null;
}

export default function JobApplicationCard({
  companyName,
  jobTitle,
  notes,
  status,
}: JobApplicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{companyName}</CardTitle>
          <Badge>{status}</Badge>
        </div>
        <CardDescription>{jobTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{notes}</p>
      </CardContent>
    </Card>
  );
}
