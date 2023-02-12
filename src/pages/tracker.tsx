import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import CreateJobApp from '../components/createJobApp';
import JobApplications from '../components/JobApplications';
import { getServerAuthSession } from '../server/auth';
import { Box } from '@chakra-ui/react';

const Tracker = ({ session }: { session: Session }) => {
  const { data } = useSession();
  return (
    <Box w={'75%'} margin={'auto'}>
      <h1>{data?.user.name}</h1>
      <CreateJobApp />
      <JobApplications />
    </Box>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
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

export default Tracker;
