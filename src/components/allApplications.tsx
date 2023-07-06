import { JobApplication } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import JobApplicationCard from "./JobApplicationCard";

export default function AllApplications() {
  const { data: sessionData } = useSession();

  const { data, isLoading, isError } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading applications...</p>;
  }

  return (
    <div className="flex flex-wrap gap-6">
      {data?.map((application: JobApplication) => (
        <JobApplicationCard
          id={application.id}
          companyName={application.company_name}
          jobTitle={application.job_title}
          location={application.location}
          appliedDate={application.applied_date}
          status={application.status}
        />
      ))}
    </div>
  );
}
