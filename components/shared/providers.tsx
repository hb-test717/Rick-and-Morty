"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default Provider;
