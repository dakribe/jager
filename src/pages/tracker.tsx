import type { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import CreateJobApp from "../components/createJobApp";
import JobApplications from "../components/JobApplications";
import { getServerAuthSession } from "../server/auth";
import ApplicationStats from "../components/ApplicationStats";
import Head from "next/head";

const Tracker = ({ session }: { session: Session }) => {
  const { data } = useSession();
  return (
    <div>
      <Head>
        <title>JAT - Tracker</title>
      </Head>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Hello, {data?.user.name}</p>
      </div>
      <h2 className="text-2xl font-semibold mb-3">Add Job Application</h2>
      <div className="flex justify-between items-center align-end">
        <CreateJobApp />
      </div>
      <div className="flex items-center"></div>
      <ApplicationStats />
      <p className="text-2xl font-semibold mb-2">Applications</p>
      <JobApplications />
    </div>
  );
};

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

export default Tracker;
