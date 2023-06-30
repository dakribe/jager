import { api } from "~/utils/api";
import JobApplicationCard from "./JobApplicationCard";

export default function LatestApplications() {
  const latestAppliations = api.jobApplication.getLatest.useQuery({
    amount: 5,
  });

  return (
    <div className="flex gap-6">
      {latestAppliations.data?.map((application) => (
        <JobApplicationCard
          key={application.id}
          id={application.id}
          companyName={application.company_name}
          jobTitle={application.job_title}
          appliedDate={application.applied_date}
          status={application.status}
        />
      ))}
    </div>
  );
}
