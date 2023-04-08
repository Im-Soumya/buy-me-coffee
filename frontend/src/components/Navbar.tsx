import { Button, Flex, Text } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex w="full" position="absolute" zIndex="10" alignItems="center" justifyContent="space-between" py="5" px={{ base: "5", md: "20" }}>
        <Text fontWeight="700">Buy me a Coffee</Text>
        <Button 
            bg="teal.200" 
            color="neutral.900" 
            fontSize={{ base: "xs", md: "sm" }}
            _hover={{ bg: "emerald.100" }}
        >
            Connect Wallet
        </Button>
    </Flex>
  )
}

export default Navbar