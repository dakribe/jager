import { useSession } from 'next-auth/react';
import { api } from '../utils/api';

export default function JobApplications() {
  const { data } = useSession();
  const jobApplications = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });

  return (
    <div>
      {jobApplications.data?.map((job) => (
        <h1>{job.company}</h1>
      ))}
    </div>
  );
}
