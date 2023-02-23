import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <Flex flexDir={"row"} my={"4"} alignItems={"center"}>
      <Heading className="font-bold text-4xl">JAT</Heading>
      <Spacer />
      {sessionData ? (
        <Button textColor={"blackAlpha.900"} onClick={() => signOut()}>
          Sign out
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
}
