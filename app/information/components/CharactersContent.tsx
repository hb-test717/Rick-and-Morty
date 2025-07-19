import { Box, VStack } from '@chakra-ui/react';
import CharacterListItem from './CharacterListItem';
import { Character } from '@/types/character';
import Pagination from '@/components/shared/pagination';
import getCharacters from '@/api/getCharacters';
import Alert from '@/components/shared/Alert';

const PAGE_SIZE = 20;

const CharactersContent = async ({ page }: { page: number }) => {
  const { data, error } = await getCharacters(page);

  if (error) {
    return (
      <Alert>There was an error fetching characters. Please try again later.</Alert>
    );
  }

  return (
    <>
      <VStack gap={0} align="stretch">
        {data.characters.results.map((character: Character) => (
          <CharacterListItem character={character} key={character.id} />
        ))}
      </VStack>

      <Box width="100%" display="flex" justifyContent="center" alignItems="center">
        <Pagination details={data.characters.info} currentPage={page} pageSize={PAGE_SIZE} />
      </Box>
    </>
  );
}

export default CharactersContent;
