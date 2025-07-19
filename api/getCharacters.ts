import { gql } from '@apollo/client';
import { getClient } from './apolloClient';

/**
 * GraphQL query to fetch paginated character data
 * Includes all necessary fields for displaying character information
 */
const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
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

/**
 * Fetches a paginated list of characters from the Rick and Morty API
 * @param page - The page number to fetch (1-based index). Defaults to 1
 * @returns Promise with query result containing character data and pagination info
 */
const getCharacters = async (page: number = 1) => {
  return getClient().query({ query: GET_CHARACTERS_QUERY, variables: { page } });
};

export default getCharacters;
