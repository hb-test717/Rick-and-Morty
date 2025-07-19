import { Center, Card } from '@chakra-ui/react';
import CharacterListItem from './CharacterListItem';
import { Character } from '@/types/character';
import Pagination from '@/components/shared/pagination';
import getCharacters from '@/api/getCharacters';
import Alert from '@/components/shared/Alert';
import LinkButton from '@/components/shared/LinkButton';

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
      {data.characters.results.length > 0 ? (
        <>
          {data.characters.results.map((character: Character) => (
            <CharacterListItem character={character} key={character.id} />
          ))}

          <Center><Pagination details={data.characters.info} currentPage={page} pageSize={PAGE_SIZE} /></Center>
        </>
      ) :
        /* The API returns empty array when page number is higher than max page etc.. */
        <CharactersNotFound />
      }
    </>
  );
}

/**
 * UI when the API returns empty list of array.
 */
const CharactersNotFound = () => (
  <Card.Root>
    <Card.Body gap="2">
      <Card.Title mt="2">Characters not found</Card.Title>
      <Card.Description>
        Cannot fetch any characters for this page. Adjust your page number and try again.
      </Card.Description>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <LinkButton href="/information">Back to Characters</LinkButton>
    </Card.Footer>
  </Card.Root>
)

export default CharactersContent;
