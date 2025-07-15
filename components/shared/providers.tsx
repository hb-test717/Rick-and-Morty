"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

// Third party providers required for the application
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  )
}

export default Providers;
