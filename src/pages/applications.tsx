import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import IndexLayout from "~/components/IndexLayout";
import { columns } from "~/components/applications/columns";
import { JobApplicationTable } from "~/components/applications/data-table";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export default function Applications() {
  const { data: sessionData } = useSession();
  const { data, isLoading, isError } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Loading...</p>;
  }

  return (
    <IndexLayout title="Applications">
      <JobApplicationTable columns={columns} data={data!} />
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
