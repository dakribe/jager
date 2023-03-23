import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import StatCard from "./StatCard";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function ApplicationStats() {
  const { data } = useSession();
  const jobAppData = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });
  const totalApps = jobAppData.data?.length;
  const offerApps = jobAppData.data?.filter((app) => {
    return app.status === "Offer";
  });
  const rejectedApps = jobAppData.data?.filter((app) => {
    return app.status === "Rejected";
  });
  const interviewingApps = jobAppData.data?.filter((app) => {
    return app.status === "Interviewing";
  });
  const appliedApps = jobAppData.data?.filter((app) => {
    return app.status === "Applied";
  });
  const declinedApps = jobAppData.data?.filter((app) => {
    return app.status === "Declined";
  });
  const acceptedApps = jobAppData.data?.filter((app) => {
    return app.status === "Accepted";
  });
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-4 flex w-40 items-center">
            <p className="font-medium text-xl">View Stats</p>
            <ChevronRightIcon
              className={
                open
                  ? "text-orange-500 h-8 w-8 transform rotate-90"
                  : "text-orange-500 h-8 w-8"
              }
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="border border-orange-700 rounded-2xl mb-2">
              <div className="flex text-center justify-around p-1">
                <StatCard title={"Total"} count={totalApps} />
                <StatCard title={"Applied"} count={appliedApps?.length} />
                <StatCard
                  title={"Interviewing"}
                  count={interviewingApps?.length}
                />
                <StatCard title={"Offered"} count={offerApps?.length} />
                <StatCard title={"Rejected"} count={rejectedApps?.length} />
                <StatCard title={"Declined"} count={declinedApps?.length} />
                <StatCard title={"Accepted"} count={acceptedApps?.length} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
