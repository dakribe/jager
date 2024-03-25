import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { getServerAuthSession } from "~/server/auth";

export default function Dashboard() {
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <h1>{sessionData?.user.name}</h1>
      <button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        Change Theme
      </button>
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
