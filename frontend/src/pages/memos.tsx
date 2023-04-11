import Head from "next/head"
import { Box, Flex } from "@chakra-ui/react"

import { DEFAULT_FONT_SIZES } from "@/lib/constants/ui"
import Navbar from "@/components/Sections/Navbar"
import Memos from "@/components/Sections/Memos"

const memos = () => {
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
          minH="100vh"
          minW="full"
          bg="primary"
          color="white"
          fontSize={DEFAULT_FONT_SIZES}
          overflowY="hidden"
        >
            <Flex direction="column" gap="10">
              <Navbar />
              <Memos />
            </Flex>
        </Box>
      </main>
    </>
  )
}

export default memos