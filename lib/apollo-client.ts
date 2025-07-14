import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.RICK_AND_MORTY_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
