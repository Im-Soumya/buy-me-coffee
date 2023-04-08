import Head from 'next/head'
import { Box } from "@chakra-ui/react"

import { DEFAULT_FONT_SIZES } from '@/lib/constants/ui'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          minH="100vh"
          minW="full"
          bg="primary"
          color="white"
          fontSize={DEFAULT_FONT_SIZES}
          overflowX="hidden"
        >
          <Navbar />
          <Hero />
        </Box>
      </main>
    </>
  )
}
