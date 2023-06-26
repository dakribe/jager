import { Box, Title } from "@mantine/core";
import { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import IndexLayout from "~/components/IndexLayout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const Applications: NextPage = () => {
  const { data } = useSession();

  const allApplications = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });

  return (
    <IndexLayout>
      <Box mt="xl" ml="lg">
        <Title>Applications</Title>
        <Box mt="2rem">
          {allApplications.data?.map((application) => {
            return <p key={application.id}>{application.company_name}</p>;
          })}
        </Box>
      </Box>
    </IndexLayout>
  );
};

export default Applications;

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
