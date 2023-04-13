import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'

import { theme } from "@/theme"
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}
