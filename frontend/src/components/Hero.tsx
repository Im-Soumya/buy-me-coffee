import { Flex, Input, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, ModalFooter, Button, useDisclosure } from "@chakra-ui/react"

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex direction="column" minH="100vh" alignItems="center" justifyContent="center" gap={{ base: "6", md: "14" }}>
        <Heading size={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }} color="teal.50" fontFamily="body">
            Buy Heisenberg a Coffee!
        </Heading>

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
              _hover={{ bg: "teal.100", color: "neutral.800", boxShadow: "0px 3px 30px 21px", transitionDuration: "300ms" }}
              onClick={onOpen}
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
              _hover={{ bg: "teal.100", color: "neutral.800", boxShadow: "0px 3px 30px 21px", transition: "all 300ms" }}
              onClick={onOpen}
            >
              Large coffee
            </Button>
          </Flex>

          <Text fontSize={{ base: "sm", md: "md" }} color="neutral.500">See other memos</Text>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent py="2" bg="neutral.800" color="neutral.200">
            <ModalHeader fontSize={{ base: "md", md: "xl" }}>
              Buy a regular coffee
              <Text color="neutral.400" mt="1" fontWeight="400" fontSize={{ base: "xs" }}>Want to stay anonymous? Just send lol.</Text>
            </ModalHeader>

            <ModalBody>
              <FormControl>
                <Input mb="5" fontSize={{ base: "sm", md: "md" }} placeholder="Anonymous?..." />
                <Input fontSize={{ base: "sm", md: "md" }} placeholder="Enjoy your coffee." />
              </FormControl>
            </ModalBody>

            <ModalFooter gap="3">
              <Button
                bg="teal.200"
                color="neutral.800"
                fontSize={{ base: "xs", md: "sm" }}
                px="4"
                borderRadius={{ base: "10px", md: "12px" }}
                _hover={{ bg: "teal.100" }}
                onClick={onClose}
              >
                Buy coffee for 0.01ETH
              </Button>
              <Button 
                variant="ghost" 
                fontSize={{ base: "xs", md: "sm" }}
                px="3"
                borderRadius={{ base: "10px", md: "12px" }}
                _hover={{ bg: "neutral.700" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Flex>
  )
}

export default Hero