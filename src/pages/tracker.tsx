import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import CreateJobApp from '../components/createJobApp';
import { getServerAuthSession } from '../server/auth';

const Tracker = ({ session }: { session: Session }) => {
  const { data } = useSession();
  return (
    <div>
      <h1>{data?.user.name}</h1>
      <CreateJobApp />
    </div>
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
