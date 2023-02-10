import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Box, Heading } from '@chakra-ui/react';

import { api } from '../utils/api';
import ToggleColorMode from '../components/ToggleColorMode';

const Home: NextPage = () => {
  return (
    <>
      <Box bg={'gray.900'}>
        <Heading color={'white'}>JAT</Heading>
      </Box>
      <ToggleColorMode />
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};
