import { GetServerSidePropsContext } from "next";
import ApplicationList from "~/components/ApplicationList";
import IndexLayout from "~/components/IndexLayout";
import { getServerAuthSession } from "~/server/auth";

export default function Applications() {
  return (
    <IndexLayout title="Applications">
      <ApplicationList />
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
