import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <p>Hello {session?.user.name}</p>
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
