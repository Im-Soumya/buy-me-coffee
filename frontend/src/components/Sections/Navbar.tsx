import Link from 'next/link'
import { useEffect } from 'react'
import { useMoralis } from "react-moralis"
import { Button, Flex, Text } from '@chakra-ui/react'

const Navbar = () => {
  const { enableWeb3, account, Moralis, deactivateWeb3, isWeb3Enabled } = useMoralis()

  const handleClick = () => {
    enableWeb3()
    if (typeof window !== undefined) {
      window.localStorage.setItem("connected", "metamask")
    }
  }

  useEffect(() => {
    if(!isWeb3Enabled && typeof window !== undefined && window.localStorage.getItem("connected")) { 
      enableWeb3()
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`)
      if(account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("Null account")
      }
    })
  }, [])

  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" py="5" px={{ base: "5", md: "20" }}>
        <Flex gap={{ base: "3", md: "5" }}>
          <Link href="/">
            <Text fontWeight="700" _hover={{ textDecor: "underline" }}>buycoffee</Text>
          </Link>

          <Link href="/memos">
            <Text fontWeight="700" _hover={{ textDecor: "underline" }}>memos</Text>
          </Link>
        </Flex>

        {account ? (
          <Flex
            px="4" 
            py="1" 
            color="neutral.400" 
            alignItems="center" 
            borderWidth="1px" 
            borderRadius="20px" 
            borderColor="teal.300" 
            _hover={{ 
              bg: "neutral.800", 
              color: "neutral.200", 
              transition: "all 200ms" 
            }}
          >
            <Text 
              as="span" 
              fontSize="md"
            >
              {account.slice(0, 6)}...{account.slice(account.length - 4)}
            </Text>
          </Flex>
        ) : (
          <Button 
            bg="teal.200" 
            color="neutral.900" 
            borderRadius={{ base: "10px", md: "12px" }}
            fontSize={{ base: "xs", md: "sm" }}
            _hover={{ bg: "teal.100" }}
            onClick={handleClick}
          >
            Connect Wallet
          </Button>
        )}
    </Flex>
  )
}

export default Navbar