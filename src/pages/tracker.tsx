import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import CreateJobApp from "../components/createJobApp";
import JobApplications from "../components/JobApplications";
import { getServerAuthSession } from "../server/auth";
import ApplicationStats from "../components/ApplicationStats";

const Tracker = ({ session }: { session: Session }) => {
  const { data } = useSession();
  return (
    <div>
      <h1>{data?.user.name}</h1>
      <CreateJobApp />
      <ApplicationStats />
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
