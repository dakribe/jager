import { api } from "~/utils/api";
import JobApplicationCard from "./JobApplicationCard";
import { useSession } from "next-auth/react";

export default function LatestApplications() {
  const { data: sessionData } = useSession();
  const { data, isLoading, isError } = api.jobApplication.getLatest.useQuery({
    amount: 5,
    userId: sessionData?.user.id as string,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading latest applications.</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-muted-foreground">
        You dont have any applications yet. Add a application from the sidebar
        to start tracking!
      </p>
    );
  }

  return (
    <div className="flex gap-6">
      {data?.map((application) => (
        <JobApplicationCard
          key={application.id}
          id={application.id}
          companyName={application.company_name}
          location={application.location}
          jobTitle={application.job_title}
          appliedDate={application.applied_date}
          status={application.status}
        />
      ))}
    </div>
  );
}
