import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import ApplicationCalendarChart from "~/components/ApplicationCalendarChart";
import IndexLayout from "~/components/IndexLayout";
import LatestApplications from "~/components/LatestApplications";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  const { data: sessionData } = useSession();
  return (
    <IndexLayout title="Dashboard">
      <div className="p-8">
        <h3 className="pb-6 text-3xl font-medium">
          Hello {sessionData?.user.name}!
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="h-60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Total Applications</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="text-muted-foreground h-4 w-4"
              >
                <path
                  fill="currentColor"
                  d="M464 352H320a16 16 0 0 0-16 16a48 48 0 0 1-96 0a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v64a64.07 64.07 0 0 0 64 64h320a64.07 64.07 0 0 0 64-64v-64a16 16 0 0 0-16-16m15.46-164.12L447.61 68.45C441.27 35.59 417.54 16 384 16H128c-16.8 0-31 4.69-42.1 13.94S67.66 52 64.4 68.4L32.54 187.88A16 16 0 0 0 32 192v48c0 35.29 28.71 80 64 80h320c35.29 0 64-44.71 64-80v-48a16 16 0 0 0-.54-4.12M440.57 176H320a15.92 15.92 0 0 0-16 15.82a48 48 0 1 1-96 0A15.92 15.92 0 0 0 192 176H71.43a2 2 0 0 1-1.93-2.52L95.71 75c3.55-18.41 13.81-27 32.29-27h256c18.59 0 28.84 8.53 32.25 26.85l26.25 98.63a2 2 0 0 1-1.93 2.52"
                />
              </svg>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Applications</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Applications</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Applications</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <ApplicationCalendarChart />
          <LatestApplications />
        </div>
      </div>
    </IndexLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
