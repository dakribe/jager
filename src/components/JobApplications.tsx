import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { api } from '../utils/api';
import JobAppCard from './JobAppCard';

export default function JobApplications() {
  const { data } = useSession();
  const jobApplications = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });

  return (
    <Box>
      {jobApplications.data?.map((job) => (
        <JobAppCard
          company={job.company}
          appliedDate={job.applied}
          id={job.id}
        />
      ))}
    </Box>
  );
}
