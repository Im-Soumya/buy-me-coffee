import Head from 'next/head'
import { Box, Flex } from "@chakra-ui/react"

import { DEFAULT_FONT_SIZES, DEFAULT_X_PADDING } from '@/lib/constants/ui'
import Navbar from '@/components/Sections/Navbar'
import Hero from '@/components/Sections/Hero'
import Footer from '@/components/Sections/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Buy me Coffee</title>
        <meta name="description" content="Decentralized version of Buy me coffee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          minW="full"
          minH="100vh" 
          bg="primary"
          color="white"
          fontSize={DEFAULT_FONT_SIZES}
          overflowY="hidden"
        >
            <Flex direction="column" gap="10">
              <Navbar />
              <Hero />
              <Footer />
            </Flex>
        </Box>
      </main>
    </>
  )
}
