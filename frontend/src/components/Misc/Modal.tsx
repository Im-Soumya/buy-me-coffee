import { FC, useState, useEffect } from "react"
import { BigNumberish, ethers } from "ethers"
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
  Button,
  useToast
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
  const { chainId: chainIdHex, account, isWeb3Enabled } = useMoralis()
  const toast = useToast()

  const [ name, setName ] = useState("")
  const [ message, setMessage ] = useState("")
  const [ regularTip, setRegularTip ] = useState("0")
  const [ largeTip, setLargeTip ] = useState("0")
  
  const addresses: IContractAddresses = contractAddresses
  const chainId: string = parseInt(chainIdHex!).toString()
  const buyMeCoffeeAddress = chainId in addresses ? addresses[chainId][0] : null
  
  const {
    runContractFunction: buyCoffee,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: buyMeCoffeeAddress!,
    functionName: regular ? "buyRegularCoffee" : "buyLargeCoffee",
    params: {
      _name: name == "" ? "anonymous" : name,
      _message: message == "" ? "Enjoy your coffee" : message,
    },
    msgValue: regular ? regularTip : largeTip
  })

  const { runContractFunction: getRegularTip } = useWeb3Contract({
    abi: abi,
    contractAddress: buyMeCoffeeAddress!,
    functionName: "getRegularTip",
    params: {}
  })

  const { runContractFunction: getLargeTip } = useWeb3Contract({
    abi: abi,
    contractAddress: buyMeCoffeeAddress!,
    functionName: "getLargeTip",
    params: {}
  })

  const handleSuccess = async () => {
    toast({
      title: `Successfully sent ${regular ? ethers.formatEther(regularTip.toString()) : ethers.formatEther(largeTip.toString())} ETH`,
      description: `${regular ? ethers.formatEther(regularTip.toString()) : ethers.formatEther(largeTip.toString())} ETH has been sent. Please wait for few seconds and check the memo section.`,
      status: "success",
      duration: 5000,
      isClosable: true
    })
  }

  const handleClick = async () => {
    if(account) {
      await buyCoffee({
        onSuccess: handleSuccess
      })
    } else {
      console.log("connect your wallet first")
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first, then try to interact.",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
    onClose()
  }

  const updateUI = async () => {
    if(chainId in addresses) {
      const regTip = ((await getRegularTip()) as BigNumberish).toString()
      setRegularTip(regTip)
      const lgTip = ((await getLargeTip()) as BigNumberish).toString()
      setLargeTip(lgTip)
    }
  }

  useEffect(() => {
    if(isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
  <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
    <ModalOverlay />
      <ModalContent py="2" bg="neutral.800" color="neutral.200">
        <ModalHeader fontSize={{ base: "md", md: "xl" }}>
          Buy a {regular ? "Regular" : "Large"} coffee
          <Text color="neutral.400" mt="1" fontWeight="400" fontSize={{ base: "xs", md: "sm" }}>Want to stay anonymous? Just send lol.</Text>
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
            isLoading={isLoading}
            onClick={handleClick}
          >
            Buy coffee for {regular ? `${ethers.formatEther(regularTip)}ETH` : `${ethers.formatEther(largeTip)}ETH`}
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