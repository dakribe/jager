import { extendTheme } from '@chakra-ui/react';

const theme = {
  config: {
    initialColorMode: 'dark',
    useColorSystem: true,
  },
  styles: {
    global: {},
  },
};

export default extendTheme(theme);
