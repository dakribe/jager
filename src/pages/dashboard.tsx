import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import IndexLayout from "~/components/IndexLayout";
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
      ></IndexLayout>
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
