import { Flex, Text, Heading, Button, useDisclosure } from "@chakra-ui/react"

import CustomModal from "@/components/Misc/Modal"
import Address from "@/components/Misc/Address"

const Hero = () => {
  const { isOpen: regularIsOpen, onOpen: regularOnOpen, onClose: regularOnClose } = useDisclosure()
  const { isOpen: largeIsOpen, onOpen: largeOnOpen, onClose: largeOnClose } = useDisclosure()

  return (
    <Flex direction="column" h="65vh" alignItems="center" justifyContent="center" gap={{ base: "6", md: "10" }}>
        <Flex direction="column" alignItems="center">
          <Heading size={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }} color="teal.50" fontFamily="body">
              Buy Heisenberg a Coffee!
          </Heading>
          <Text color="neutral.500" mt={{ base: "2", md: "5" }}><Address /></Text>
        </Flex>

        <Flex direction="column" alignItems="center" gap={{ base: "4", md: "6" }}>
          <Flex gap={{ base: "4", md: "6" }}>
            <Button 
              bg="teal.300"
              color="neutral.900"
              borderWidth="1px"
              borderColor="teal.200"
              borderRadius={{ base: "12px", md: "16px" }}
              px={{ base: "5", md: "6" }}
              py={{ base: "5", md: "6" }}
              fontSize={{ base: "xs", md: "md", lg: "lg" }}
              _hover={{ bg: "teal.100", color: "neutral.800", boxShadow: "0px 3px 25px 15px", transitionDuration: "300ms" }}
              onClick={regularOnOpen}
            >
              Regular coffee
            </Button>
            <Button 
              bg="transparent"
              color="teal.200"
              borderWidth="1px"
              borderColor="teal.200"
              borderRadius={{ base: "12px", md: "16px" }}
              px={{ base: "5", md: "6" }}
              py={{ base: "5", md: "6" }}
              fontSize={{ base: "xs", md: "md", lg: "lg" }}
              _hover={{ bg: "teal.100", color: "neutral.800", boxShadow: "0px 3px 25px 15px", transition: "all 300ms" }}
              onClick={largeOnOpen}
            >
              Large coffee
            </Button>
          </Flex>
        </Flex>

        {regularIsOpen ? (
          <CustomModal isOpen={regularIsOpen} onClose={regularOnClose} regular={true} />
        ): (
          <CustomModal isOpen={largeIsOpen} onClose={largeOnClose} regular={false} />
        )}
    </Flex>
  )
}

export default Hero