import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  FormControl, 
  Text, 
  Input, 
  Button 
} from "@chakra-ui/react"

type Flags = {
  isOpen: boolean,
  onClose: boolean, 
  regular: boolean
}

const CustomModal = ({ isOpen, onClose, regular }: Flags, ) => {
  return (
  <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
    <ModalOverlay />
      <ModalContent py="2" bg="neutral.800" color="neutral.200">
        <ModalHeader fontSize={{ base: "md", md: "xl" }}>
          Buy a {regular ? "Regular" : "Large"} coffee
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
            Buy coffee for {regular ? "0.01ETH": "0.03ETH"}
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
  )
}

export default CustomModal