import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { theme } from "@/theme"

import { ChakraProvider } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}
