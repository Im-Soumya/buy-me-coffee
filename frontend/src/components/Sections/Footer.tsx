import { GITHUB } from "@/lib/constants/urls"
import { Flex, Link, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Flex direction="column" alignItems="center" py="2">
        <Text fontSize={{ base: "xs", md: "sm" }} color="neutral.400">The code for this website is available on <Link textDecor="underline" href={GITHUB} isExternal>github</Link>.</Text>
        <Text fontSize={{ base: "xs", md: "sm" }} color="neutral.600">Thanks for visiting. Have a good day!</Text>
    </Flex>
  )
}

export default Footer