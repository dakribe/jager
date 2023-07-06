import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import IndexLayout from "~/components/IndexLayout";
import AllApplications from "~/components/allApplications";
import { getServerAuthSession } from "~/server/auth";

const Applications: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jager | Applications</title>
      </Head>
      <IndexLayout
        heading="Applications"
        subHeading="Here's a list of all your job applications."
      >
        <AllApplications />
      </IndexLayout>
    </>
  );
};

export default Applications;

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
