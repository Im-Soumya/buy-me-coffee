import { useState, useEffect } from "react"
import { Flex, Box, Text } from "@chakra-ui/react"
import { ethers } from "ethers"

import { contractAddresses, abi } from "../../constants"
import styles from "@/styles/Home.module.css"

interface IcontractAddresses {
    [key: string]: string[]
}

const Hero = () => {
  const addresses: IcontractAddresses = contractAddresses
  
  const [currentAccount, setCurrentAccount] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [memos, setMemos] = useState<object[]>([])

  const isWalletConnected = async () => {
    try {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(`Accounts: ${accounts}`)

        if(accounts.length > 0) {
            const account = accounts[0]
            console.log(`Wallet is connected: ${account}`)
        } else {
            console.log("Make sure Metamask is connected!")
        }
    } catch(error) {
        console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
        const { ethereum } = window
        
        if(!ethereum) {
            console.log("Please install metamask")
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" })
        setCurrentAccount(accounts[0])
    } catch(error) {
        console.log(error)
    }
  }

  const getMemos = async () => {
    try {
        const { ethereum } = window

        if(ethereum) {
            const provider = new ethers.BrowserProvider(ethereum, "any") 
            const signer = await provider.getSigner()
            const network = await provider.getNetwork()

            const buyMeCoffeeAddress = network.chainId.toString() in addresses ? addresses[network.chainId.toString()][0] : ""
            const buyMeCoffee = new ethers.Contract(buyMeCoffeeAddress, abi, signer)

            console.log("Getting memo...")
            const memoTxn = await buyMeCoffee.getMemos()
            
            setMemos(memoTxn)
        }
    } catch(error) {
        console.log(error)
    }
  }

  const buyCoffee = async () => {
    try {
        const { ethereum } = window

        if(ethereum) {
            const provider = new ethers.BrowserProvider(ethereum, "any")
            const signer = await provider.getSigner()
            const network = await provider.getNetwork()
            
            const buyMeCoffeeAddress = network.chainId.toString() in addresses ? addresses[network.chainId.toString()][0] : ""
            const buyMeCoffee = new ethers.Contract(buyMeCoffeeAddress, abi, signer)

            console.log("Buying coffee...")
            const coffeeTxn = await buyMeCoffee.buyCoffee(
                name ? name : "anon",
                message ? message : "Enjoy your coffee",
                { value: ethers.parseEther("0.001") }
            )
            await coffeeTxn.wait()
            console.log("Coffee txn mined!")
            console.log("Coffee purchased")

            setName("")
            setMessage("")
        }
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    let buyMeCoffee: any
    isWalletConnected()

    const onNewMemo = async (from: string, timestamp: any, name: string, message: string, tip: Number) => {
        console.log(`Memo received: ${from}, ${name}, ${message}, ${timestamp}, ${tip}`)
        setMemos((prevState) => [
            ...prevState,
            {
                from: from,
                name,
                message,
                timestamp: new Date(timestamp * 1000),
                tip
            }
        ])
    }

    const listen = async () => {
        const provider = new ethers.BrowserProvider(ethereum, "any")
        const signer = await provider.getSigner()
        const network = await provider.getNetwork()
        const buyMeCoffeeAddress = network.chainId.toString() in addresses ? addresses[network.chainId.toString()][0] : ""
        buyMeCoffee = new ethers.Contract(buyMeCoffeeAddress, abi, signer)
        buyMeCoffee.on("NewMemo", onNewMemo)
    }

    const { ethereum } = window
    if(ethereum) {
        listen()
    }

    return () => {
        if(buyMeCoffee) {
            buyMeCoffee.off("NewMemo", onNewMemo)
        }
    }
  }, [])

  return (
    <Flex direction="column">
        <Flex>
            {!currentAccount && (
                <Box as="button" onClick={connectWallet}>Connect Wallet</Box>
            )}
            {currentAccount &&  (
                <Box as="button" className={styles.button} onClick={buyCoffee}>
                    <Text as="span" fontSize={{ base: "sm"}}>Buy me a coffee</Text>
                </Box>
            )}
        </Flex>

        {currentAccount && 
            <>
            <Box 
                as="button"
                px="3"
                py="2"
                border="1px" 
                borderRadius="8px"
                borderColor="neutral.400"
                _hover={{ bg: "neutral.900", transitionDuration: "2s00ms" }}
                onClick={getMemos}
            >
                See memos
            </Box>
            <Flex direction="column" gap="3">
                {memos.map(( memo, index ) => (
                    <Flex 
                        key={index} 
                        px="3"
                        py="2"
                        gap="2"
                        direction="column"
                        border="1px"
                        borderColor="neutral.600"
                        borderRadius="8px"
                    >
                        <Text>{memo.name} <Text as="span" color="neutral.500">{`${memo.from.slice(0,6)}...${memo.from.slice(38)}`}</Text></Text>
                        <Text>{memo.message}</Text>
                    </Flex>
                ))}
            </Flex>
            </>
        }
    </Flex>
  )
}

export default Hero