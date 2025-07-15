"use server"

import Pagination from '@/components/shared/pagination';
import { getClient } from '@/lib/ApolloClient';
import { gql } from '@apollo/client';
import { Alert, Avatar, Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';

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
          <HStack
            key={character.id}
            p={4}
            borderBottomWidth={1}
            borderColor="gray.200"
            _hover={{ bg: "gray.50" }}
            gap={4}
            align="center"
          >
            <Avatar.Root shape="rounded" size="lg">
              <Avatar.Image src={character.image} />
              <Avatar.Fallback name={character.name} />
            </Avatar.Root>
            <VStack align="start" gap={0} flex={1}>
              <Text fontSize="md" fontWeight="medium">
                {character.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {character.species} • {character.gender} • {character.status}
              </Text>
            </VStack>
            <Button variant="ghost" size="sm">
              View details
            </Button>
          </HStack>
        ))}
      </VStack>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" py={12}>
        <Pagination total={data.characters.info.count} page={page} pageSize={PAGE_SIZE} />
      </Box>
    </Container >
  );
}

type Character = {
  id: string;
  image: string;
  name: string;
  gender: string;
  status: string;
  species: string;
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
        gender
        image
      }
    }
  }
`;


export default InformationPage;
