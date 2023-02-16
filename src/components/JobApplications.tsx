import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import JobAppCard from "./JobAppCard";

export default function JobApplications() {
  const { data } = useSession();
  const jobApplications = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });

  return (
    <Box bg={"green"}>
      {jobApplications.data?.map((job) => (
        <JobAppCard
          key={job.id}
          company={job.company}
          appliedDate={job.applied}
          status={job.status}
          id={job.id}
        />
      ))}
    </Box>
  );
}
