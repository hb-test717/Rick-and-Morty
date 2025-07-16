"use client";

import LinkButton from "@/components/shared/LinkButton";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.50"
      px={4}
    >
      <Stack gap={6} textAlign="center" width="360px" align="center">
        <Heading size="2xl" color="teal.600">
          Rick and Morty Explorer
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Explore your favourite characters and episodes.
        </Text>

        <LinkButton colorScheme="teal" size="lg" href="/information">Browse Characters</LinkButton>
      </Stack>
    </Box >
  );
}

export default Home;
