"use client"

import { Character } from "@/types/character";
import { Avatar, VStack, Text, Button, useDisclosure, Stack, Flex } from "@chakra-ui/react";
import CharacterDetailsModal from "./CharacterDetailsModal";

const CharacterListItem = ({ character }: { character: Character }) => {
  const { open, setOpen } = useDisclosure()

  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        key={character.id}
        borderBottomWidth={1}
        borderColor="gray.200"
        _hover={{ bg: "gray.50" }}
        gap={4}
        p={4}
        align="center"
      >
        <Flex justifyItems="flex-start" alignItems="flex-start" width="100%" gap={4}>
          <Avatar.Root shape="rounded" size="2xl">
            <Avatar.Image src={character.image} alt={character.name} />
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
        </Flex>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="lg"
          width={{ base: "100%", md: "auto" }}
        >
          View details
        </Button>
      </Stack >
      <CharacterDetailsModal character={character} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CharacterListItem;
