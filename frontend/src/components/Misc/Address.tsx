import { FC } from "react"
import { Flex, Link, Text, useClipboard } from "@chakra-ui/react"
import { ADDRESS } from "@/lib/constants/urls"

const CopyAddress: FC = () => {
    const { onCopy, hasCopied } = useClipboard("0x8840BB0D5990161889388Ab0979EF2103cF0dAdF")
    
    return (
        <Text
            as="span"
            onClick={onCopy}
        >
            {hasCopied ? "Copied": "0x8840BB0D5990161889388Ab0979EF2103cF0dAdF"}
        </Text>
    )
}

const Address: FC = () => {
  return (
    <Link isExternal href={`https://goerli.etherscan.io/address/${ADDRESS}`}>Heisenberg</Link>
  )
}

export default Address