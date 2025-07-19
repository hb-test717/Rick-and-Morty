import { Stack, Flex, VStack, Skeleton } from '@chakra-ui/react';

const NUMBER_OF_CHARACTERS = 10;

/**
 * Skeleton UI for characters list
 */
const CharactersLoading = () => {
  return (
    <>
      <VStack py={2} gap={0} align="stretch">
        {Array(NUMBER_OF_CHARACTERS).fill(0).map((_, i) => (
          <Stack
            direction={{ base: "column", md: "row" }}
            key={i}
            borderBottomWidth={1}
            gap={4}
            p={4}
            align="center"
          >
            <Flex justifyItems="flex-start" alignItems="flex-start" width="100%" gap={4}>
              <Skeleton height="65px" width="65px" />
              <VStack align="start" gap={2} flex={1}>
                <Skeleton height="20px" width="100px" />
                <Skeleton height="15px" width="150px" />
              </VStack>
            </Flex>
            <Skeleton height="45px" width="150px" />

          </Stack>
        ))}
      </VStack >
    </>
  );
};
export default CharactersLoading;
