'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

interface ChakraProps {
  children: React.ReactNode
}

const Providers: React.FC<ChakraProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
