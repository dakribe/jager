import { useSession } from "next-auth/react";
import { api } from "../utils/api";

export default function ApplicationStats() {
  const { data: sessionData } = useSession();
  const jobAppData = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });
  const totalApps = jobAppData.data?.length;

  return (
    <div className="bg-[#1e1e1e] rounded-lg my-6 border border-orange-600 w-48 text-center">
      <p className="font-semibold text-lg">Total Applications</p>
      <p className="font-bold text-orange-500 text-2xl">{totalApps}</p>
    </div>
  );
}
