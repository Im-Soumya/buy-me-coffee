import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { Flex, Text, Heading, Grid, GridItem } from '@chakra-ui/react'

import Address from '../Misc/Address'
import { abi, contractAddresses } from '../../../constants'

interface IContractAddresses {
  [key: string]: string[]
}

const Memos = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const [ memos, setMemos ] = useState<any[]>([])
  
  const addresses: IContractAddresses = contractAddresses
  const chainId = parseInt(chainIdHex!).toString()
  const buyMeCoffeeAddress = chainId in addresses ? addresses[chainId][0] : null

  const { runContractFunction: getMemos } = useWeb3Contract({
    abi: abi,
    contractAddress: buyMeCoffeeAddress!,
    functionName: "getMemos",
    params: {}
  })

  const get = async () => {
    const res: any = ((await getMemos()) as object)
    setMemos(res)
  }
  
  useEffect(() => {
    if(isWeb3Enabled) {
      get()
    }
  }, [isWeb3Enabled, memos])

  return (
    <Flex direction="column" py={{ base: "28", md: "32" }} px={{ base: "5", md: "20" }} gap={{ base: "6", md: "10" }}>
      <Heading fontSize={{ base: "md", sm: "xl", md: "2xl" }} fontFamily="body">Those who bought a coffee</Heading>

      {memos?.length > 0
        ? (
          <Grid templateColumns={{ base: "repeat(1, 1fr)", sm:"repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={{ base: "5" }}>
            {memos.map((memo, index) => (
              <GridItem 
                key={index}
                p="3"
                borderWidth="1px"
                borderColor="neutral.500"
                borderRadius="8px"
              >
                <Flex mb="2" justifyContent="space-between">
                  <Text color="neutral.200">{memo.name}</Text> 
                  <Address text={memo.from} />
                </Flex>
            
                <Text noOfLines={3} mb="2">{memo.message}</Text>

                <Flex>
                  <Text fontWeight="700" fontSize={{ base: "md" }}>{ethers.formatEther(memo.tip.toString())} ETH</Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        )
        : (
          <Flex>
            <Text color="neutral.300">Nothing to see here for now.</Text>
          </Flex>
        )
      }
    </Flex>
  )
}

export default Memos