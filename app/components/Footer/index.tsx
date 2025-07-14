import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="gray.200" py={6} px={4}>
      <Flex
        direction={{ base: 'column' }}
        justify="space-between"
        align="center"
        maxW="6xl"
        mx="auto"
      >
        <Text fontSize="sm">
          Rick and Morty. Version {process.env.NEXT_PUBLIC_CHALLENGE_VERSION}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
