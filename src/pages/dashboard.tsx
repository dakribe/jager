import { GetServerSidePropsContext } from "next";
import IndexLayout from "~/components/IndexLayout";
import LatestApplications from "~/components/LatestApplications";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  return (
    <IndexLayout title="Dashboard">
      <div>
        <LatestApplications />
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
