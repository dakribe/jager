import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import Header from "../components/Header";
import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "./../utils/theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Box mx={"auto"} maxW={"80%"}>
          <Header />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
