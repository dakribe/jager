import { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import IndexLayout from "~/components/IndexLayout";
import JobApplicationCard from "~/components/JobApplicationCard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const Applications: NextPage = () => {
  const { data } = useSession();

  const allApplications = api.jobApplication.getAll.useQuery({
    userId: data?.user.id as string,
  });

  return (
    <>
      <Head>
        <title>JAT | Applications</title>
      </Head>
      <IndexLayout>
        <div className="pl-8">
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold">Applications</h2>
            <p className="text-muted-foreground">
              Here's a list of all your job applications.
            </p>
          </div>
          <div className="flex gap-4">
            {allApplications.data?.map((application) => (
              <JobApplicationCard
                companyName={application.company_name}
                jobTitle={application.job_title}
                appliedDate={application.applied_date}
                status={application.status}
              />
            ))}
          </div>
        </div>
      </IndexLayout>
    </>
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
