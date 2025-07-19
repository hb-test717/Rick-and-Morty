import Modal from "@/components/shared/Modal";
import { Character } from "@/types/character";
import { HStack, VStack, Text, Image, Box } from "@chakra-ui/react";

interface CharacterDetailsModalProps {
  character: Character
  open: boolean
  onClose: () => void
}
const CharacterDetailsModal = ({ character, open, onClose }: CharacterDetailsModalProps) => {
  return (
    <Modal
      title={`Details for ${character.name}`}
      open={open}
      onClose={onClose}
    >
      <HStack gap={6} align="flex-start" mb={4} flexDir={{ base: "column", sm: "row" }}>
        <Image
          src={character.image}
          alt={character.name}
          borderRadius="lg"
          boxSize={{ base: "100%", sm: "250px" }}
          objectFit="cover"
        />

        <VStack align="start" gap={2} flex="1">
          <Text fontSize="lg"><strong>{character.name}</strong></Text>
          <Text as="dl" fontSize="sm">
            <dt><strong>Status</strong></dt>
            <dd>{character.status}</dd>
          </Text>
          <Text as="dl" fontSize="sm">
            <dt><strong>Species</strong></dt>
            <dd>{character.species}</dd>
          </Text>
          {character.type && (
            <Text as="dl" fontSize="sm">
              <dt><strong>Type</strong></dt>
              <dd>{character.type}</dd>
            </Text>
          )}
          <Text as="dl" fontSize="sm">
            <dt><strong>Gender</strong></dt>
            <dd>{character.gender}</dd>
          </Text>
          <Text as="dl" fontSize="sm">
            <dt><strong>Origin</strong></dt>
            <dd>{character.origin.name}</dd>
          </Text>
          <Text as="dl" fontSize="sm">
            <dt><strong>Location</strong></dt>
            <dd>{character.location.name}</dd>
          </Text>
        </VStack>
      </HStack>

      <Box borderBottom="1px solid" borderColor="gray.200" my={4} />

      <Text fontWeight="bold" mb={2}>Episodes</Text>
      <Box height="200px" pr={2}>
        <VStack align="start" gap={2}>
          {character.episode.map((ep) => (
            <Box key={ep.id} p={2} bg="gray.50" borderRadius="md" w="100%">
              <Text fontSize="md" fontWeight="medium">{ep.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {ep.air_date}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Modal>
  );
};

export default CharacterDetailsModal;
