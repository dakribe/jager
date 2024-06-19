import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useSession } from "next-auth/react";

export default function LatestApplications() {
  const { data: sessionData } = useSession();

  const { data: latestApplications } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Here are the latest applications</CardDescription>
      </CardHeader>
      <CardContent>
        {latestApplications?.map((application) => <p>{application.company}</p>)}
      </CardContent>
    </Card>
  );
}
