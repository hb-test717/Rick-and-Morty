"use client"

import Modal from "@/components/shared/Modal";
import { HStack, Avatar, VStack, Text, Button, useDisclosure, Image, Box } from "@chakra-ui/react";

type Character = {
  id: string;
  image: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  }
  location: {
    name: string;
    url: string;
  }
  episode: Array<{
    id: string;
    name: string;
    air_date: string;
  }>;
}

const CharacterListItem = ({ character }: { character: Character }) => {
  const { open, setOpen } = useDisclosure()

  return (
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
      <Button onClick={() => setOpen(true)} variant="ghost" size="sm">
        View details
      </Button>

      <Modal
        title={`Details for ${character.name}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <HStack gap={6} align="flex-start" mb={4}>
          <Image
            src={character.image}
            alt={character.name}
            borderRadius="lg"
            boxSize="150px"
            objectFit="cover"
          />

          <VStack align="start" gap={2} flex="1">
            <Text>
              <strong>Status:</strong> {character.status}
            </Text>
            <Text>
              <strong>Species:</strong> {character.species}
            </Text>
            {character.type && (
              <Text>
                <strong>Type:</strong> {character.type}
              </Text>
            )}
            <Text>
              <strong>Gender:</strong> {character.gender}
            </Text>
            <Text>
              <strong>Origin:</strong> {character.origin.name}
            </Text>
            <Text>
              <strong>Location:</strong> {character.location.name}
            </Text>
          </VStack>
        </HStack>

        <Box borderBottom="1px solid" borderColor="gray.200" my={4} />

        <Text fontWeight="bold" mb={2}>
          Episodes
        </Text>
        <Box height="250px" overflowY="auto" pr={2}>
          <VStack align="start" gap={2}>
            {character.episode.map((ep) => (
              <Box key={ep.id} p={2} bg="gray.50" borderRadius="md" w="100%">
                <Text fontWeight="medium">{ep.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {ep.air_date}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Modal>
    </HStack>
  );
};

export default CharacterListItem;
export { type Character }
