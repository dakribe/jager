import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ApplicationCard from "./ApplicationCard";
import { useApplicationDialogContext } from "~/context/NewApplicationDialogContext";
import { Button } from "./ui/button";

export default function ApplicationList() {
  const { setOpen } = useApplicationDialogContext();
  const { data: sessionData } = useSession();
  const {
    data: applications,
    isLoading,
    isError,
  } = api.jobApplication.getAll.useQuery(
    {
      userId: sessionData?.user.id as string,
    },
    {
      staleTime: Infinity,
    },
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>error...</p>;
  }

  return (
    <>
      {applications?.length === 0 ? (
        <div className="flex h-full min-h-svh items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl">You have no job applications</p>
            <p className="text-muted-foreground text-xl">
              Add a new job application to start tracking
            </p>
            <Button onClick={() => setOpen(true)}>New Application</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {applications?.map((application) => (
            <ApplicationCard
              key={application.id}
              id={application.id}
              company={application.company}
              jobTitle={application.jobTitle}
              location={application.location}
              status={application.status}
              dateApplied={application.dateApplied}
            />
          ))}
        </div>
      )}
    </>
  );
}
