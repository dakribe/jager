import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  const { data: sessionData } = useSession();
  const { data, isLoading, isError } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>error...</p>;
  }

  return (
    <div className="flex flex-col">
      {data?.map((application) => (
        <ApplicationCard
          key={application.id}
          id={application.id}
          company={application.company}
          jobTitle={application.jobTitle}
          location={application.location}
          status={application.status}
        />
      ))}
    </div>
  );
}
