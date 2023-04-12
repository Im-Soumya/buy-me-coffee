import { FC, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
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

import { contractAddresses, abi } from "../../../constants"

interface IModalProps {
  isOpen: boolean,
  onClose: any,
  regular: boolean,
}

interface IContractAddresses {
  [key: string]: string[]
}

const CustomModal: FC<IModalProps> = ({ isOpen, onClose, regular }) => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const [ name, setName ] = useState("")
  const [ message, setMessage ] = useState("")
  
  const addresses: IContractAddresses = contractAddresses
  const chainId: string = parseInt(chainIdHex!).toString()
  const buyMeCoffeeAddress = chainId in addresses ? addresses[chainId][0] : null
  
  const {
    runContractFunction: buyCoffee,
    isLoading,
    isFetching
  } = useWeb3Contract({
    abi: abi,
    contractAddress: buyMeCoffeeAddress!,
    functionName: "buyCoffee",
    params: {
      _name: name,
      _message: message,
    },
    msgValue: 0.01
  })

  const handleClick = async () => {
    await buyCoffee()
    console.log("clicked")
  }

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
            <Input 
              mb="5" 
              fontSize={{ base: "sm", md: "md" }} 
              placeholder="Anonymous?..." 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              fontSize={{ base: "sm", md: "md" }} 
              placeholder="Enjoy your coffee."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
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
            onClick={handleClick}
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