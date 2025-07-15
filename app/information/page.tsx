"use server"

import Pagination from '@/components/shared/pagination';
import { getClient } from '@/lib/ApolloClient';
import { gql } from '@apollo/client';
import { Alert, Box, Container, VStack } from '@chakra-ui/react';
import CharacterListItem, { Character } from './components/CharacterListItem';

const PAGE_SIZE = 100;

interface InformationPageProps {
  searchParams: {
    page?: string;
  };
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

  const { data, loading, error } = await getClient().query({ query: GET_CHARACTERS_QUERY, variables: { page } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      {showParamsWarning && (
        <Alert.Root status="warning">
          <Alert.Indicator />
          <Alert.Title>
            Invalid page parameter. Displaying the first page instead.
          </Alert.Title>
        </Alert.Root>
      )}
      <VStack gap={0} align="stretch">
        {data.characters.results.map((character: Character) => (
          <CharacterListItem character={character} key={character.id} />
        ))}
      </VStack>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" py={12}>
        <Pagination total={data.characters.info.count} page={page} pageSize={PAGE_SIZE} />
      </Box>
    </Container >
  );
}

const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
          type
        }
        location {
          name
          type
        }
        episode {
          id
          name
          air_date
        }
      }
    }
  }
`;

export default InformationPage;
