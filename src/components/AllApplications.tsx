import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export function AllApplications() {
  const { data: sessionData } = useSession();
  const { data: applications } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id!,
  });
  return (
    <div>
      <p>Applications</p>
      <ul>
        {applications?.map((application) => <li>{application.title}</li>)}
      </ul>
    </div>
  );
}
