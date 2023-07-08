import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import ApplicationStatCard from './ApplicationStatCard';

export default function ApplicationStats() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id!;
  const { data } = api.jobApplication.getAll.useQuery({ userId });

  const totalApplications = data?.length;
  const rejectedApplications = data?.filter((application) => {
    return application.status === 'Rejected';
  });

  return (
    <div className="flex gap-6 mb-4">
      <ApplicationStatCard
        title="Total Applications"
        value={totalApplications}
      />
      <ApplicationStatCard
        title="Rejected Applications"
        value={rejectedApplications?.length}
      />
    </div>
  );
}
