import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { signIn } from 'next-auth/react';

const Home: NextPage = () => {
  return (
    <Box w="65%" m="auto" mt={12}>
      <Center>
        <Heading size="3xl">On the job hunt?</Heading>
      </Center>
      <Center>
        <Heading size="3xl" mt={8}>
          Track all your job applications in one spot.
        </Heading>
      </Center>
      <Center>
        <Text mt={8} fontSize="2xl" fontWeight="medium">
          JAT is a tool to help you view and manage all of your job
          applications.
        </Text>
      </Center>
      <Center>
        <Button
          size="lg"
          bg="orange.500"
          w="400"
          mt={8}
          onClick={() => signIn('discord', { callbackUrl: '/tracker' })}
        >
          Sign In
        </Button>
      </Center>
    </Box>
  );
};

export default Home;
