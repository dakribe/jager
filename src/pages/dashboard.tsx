import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import CreateJobApplicationForm from "~/components/CreateJobApplicationForm";
import IndexLayout from "~/components/IndexLayout";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <IndexLayout title="Home">
      <h1>{sessionData?.user.name}</h1>
      <button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        Change Theme
      </button>
      <CreateJobApplicationForm />
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
