"use server"

import { Box, Container, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import CharactersLoading from './components/CharactersLoading';
import CharactersContent from './components/CharactersContent';
import { notFound } from 'next/navigation';

interface InformationPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const InformationPage = async ({ searchParams }: InformationPageProps) => {
  const params = await searchParams;
  const pageNumber = Number(params?.page || "1");

  // Redirect to 404 if page number is invalid
  if (isNaN(pageNumber) || pageNumber <= 0) {
    notFound();
  }

  return (
    <Container maxW="container.xl" py={6} spaceY={6}>
      <Box>
        <Text fontWeight="bold">Browse characters</Text>
        <Text fontSize="sm" color="gray.600">
          Viewing page {pageNumber}
        </Text>
      </Box>

      <Suspense fallback={<CharactersLoading />}>
        <CharactersContent page={pageNumber} />
      </Suspense>
    </Container >
  );
}

export default InformationPage;
