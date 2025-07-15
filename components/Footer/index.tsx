import { Box, Container, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  const challengeVersion = process.env.NEXT_PUBLIC_CHALLENGE_VERSION;

  return (
    !!challengeVersion && (
      <Box as="footer" bg="gray.800" color="gray.200" py={6} px={4}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            align="center"
            w="100%"
          >
            <Text textAlign={{ base: "center", sm: "left" }}>
              Rick and Morty. Version {process.env.NEXT_PUBLIC_CHALLENGE_VERSION || "1.0.0"}
            </Text>
          </Flex>
        </Container>
      </Box>
    )
  );
};

export default Footer;
