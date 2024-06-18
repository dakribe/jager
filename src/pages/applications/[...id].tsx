import { GetServerSidePropsContext } from "next";
import IndexLayout from "~/components/IndexLayout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

interface ApplicationProps {
  id: string;
}

export default function Application({ id }: ApplicationProps) {
  const { data: application } = api.jobApplication.getApplicationById.useQuery({
    id: id[0]!,
  });

  return (
    <IndexLayout title={application?.company}>
      <div>{application?.jobTitle}</div>
    </IndexLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const { id } = ctx.query;

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
      id,
    },
  };
};
