import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import ToggleColorMode from './ToggleColorMode';

export default function Header() {
  return (
    <Flex width="75%" margin="auto" mt={10}>
      <Box>
        <Heading>JAT</Heading>
      </Box>
      <Spacer />
      <Box>
        <ToggleColorMode />
      </Box>
    </Flex>
  );
}
