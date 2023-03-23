import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Box mt={"12"}>
      <Head>
        <title>Job Application Tracker</title>
      </Head>
      <Box
        flexDirection={"column"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={"6xl"}
        className="flex flex-col text-center font-bold text-6xl"
      >
        <Heading fontSize={"6xl"}>
          On the job{" "}
          <Text as={"span"} textColor={"orange.500"}>
            hunt?
          </Text>
        </Heading>
        <Heading fontSize={"6xl"}>
          Track all your job applications in{" "}
          <Text
            as={"span"}
            textDecoration={"underline"}
            textDecorationColor={"orange.500"}
          >
            one
          </Text>{" "}
          place.
        </Heading>
      </Box>
      <Box
        flexDirection={"column"}
        alignContent={"middle"}
        textAlign={"center"}
        alignItems={"center"}
        className="flex flex-col align-middle items-center"
      >
        <Text fontWeight={"semibold"} fontSize={"2xl"} my={"4"}>
          JAT is a tool to help view and manage all of your job applications.
        </Text>
        <CTAButton />
      </Box>
    </Box>
  );
};

const CTAButton = () => {
  const { data: sessionData } = useSession();
  if (sessionData) {
    return (
      <Link href={"/tracker"}>
        <Button bg={"orange.500"} _hover={{ backgroundColor: "orange.600" }}>
          View tracker
        </Button>
      </Link>
    );
  } else {
    return (
      <Button
        bg={"orange.500"}
        _hover={{ backgroundColor: "orange.600" }}
        onClick={() => signIn("discord", { callbackUrl: "/tracker" })}
      >
        Sign in
      </Button>
    );
  }
};
export default Home;
