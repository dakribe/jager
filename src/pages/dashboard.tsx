import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import IndexLayout from "~/components/IndexLayout";
import LatestApplications from "~/components/LatestApplications";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Jager | Home</title>
      </Head>
      <IndexLayout
        heading="Home"
        subHeading="Welcome to Jager job application tracker."
      >
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-2">
          Latest Applications
        </h2>
        <LatestApplications />
      </IndexLayout>
    </>
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
