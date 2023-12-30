import { GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();
  const { data: applications } = api.jobApplication.getAll.useQuery({
    userId: sessionData?.user.id as string,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{"Hello " + sessionData?.user.name}</p>
      <ul>
        {applications?.map((application) => <ul>{application.title}</ul>)}
      </ul>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
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
