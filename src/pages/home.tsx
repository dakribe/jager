import { GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { AllApplications } from "~/components/AllApplications";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{"Hello " + sessionData?.user.name}</p>
      <AllApplications />
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
