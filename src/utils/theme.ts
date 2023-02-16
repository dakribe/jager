import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "default",
        bg: "#171717",
      },
    }),
  },
});

export default theme;
