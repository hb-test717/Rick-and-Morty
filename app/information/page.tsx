"use server"

import Pagination from '@/components/shared/pagination';
import { Alert, Box, Container, Text, VStack } from '@chakra-ui/react';
import CharacterListItem from './components/CharacterListItem';
import getCharacters from '@/api/getCharacters';
import { Character } from '@/types/character';

const PAGE_SIZE = 20;

interface InformationPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const InformationPage = async ({ searchParams }: InformationPageProps) => {
  // Ensure the page parameter is a valid integer. Default to 1 if not provided or invalid.
  const params = await searchParams;
  let page = Number(params?.page || "1");

  let showParamsWarning = false;
  if (!Number.isInteger(page) || page <= 0) {
    showParamsWarning = true;
    page = 1;
  }

  const { data, error } = await getCharacters(page)

  if (error) return <p>Error: {error.message}</p>;
  const hasResponse = !!data?.characters?.info?.pages;

  return (
    <Container maxW="container.xl" py={2} >
      {/* Displaying banner when invalid page is requested */}
      {
        showParamsWarning && (
          <Alert.Root role="alert" status="warning">
            <Alert.Indicator />
            <Alert.Title fontSize="sm">
              Invalid page parameter. Displaying the first page instead.
            </Alert.Title>
          </Alert.Root>
        )
      }

      {
        hasResponse ? (
          <>
            <Box py={4}>
              <Text fontWeight="bold">Browsing characters</Text>
              <Text fontSize="sm" color="gray.600">
                Page {page} of {data.characters.info.pages}
              </Text>
            </Box>

            <VStack py={2} gap={0} align="stretch">
              {data.characters.results.map((character: Character) => (
                <CharacterListItem character={character} key={character.id} />
              ))}
            </VStack>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" py={12}>
              <Pagination total={data.characters.info.count} page={page} pageSize={PAGE_SIZE} />
            </Box>
          </>
        ) : (
          // Fallback to a simple error message
          <Box py={4}>
            <Alert.Root role="alert" status="error" >
              <Alert.Indicator />
              <Alert.Title>
                There was an error fetching characters. Please try again later.
              </Alert.Title>
            </Alert.Root>
          </Box>
        )
      }
    </Container >
  );
}

export default InformationPage;
