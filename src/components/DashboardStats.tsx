import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useSession } from "next-auth/react";

export default function DashboardStats() {
  const { data } = useSession();
  const jobApplicationData = api.application.getAll.useQuery({
    userId: data?.user.id as string,
  });

  const totalApplications = jobApplicationData.data?.length;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>Amount of jobs applied to</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-3xl font-semibold">{totalApplications}</p>
        </CardContent>
      </Card>
    </div>
  );
}
