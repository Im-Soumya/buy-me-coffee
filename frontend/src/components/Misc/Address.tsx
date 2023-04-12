import { Text, useClipboard } from "@chakra-ui/react"
import * as Tooltip from "@radix-ui/react-tooltip"
import styles from "@/styles/Tooltip.module.css"
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons"

const Address = ({ text } : { text: string }) => {
  const { onCopy, hasCopied } = useClipboard(text)
  
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger asChild>
          <Text
            display="flex"
            alignItems="center"
            fontSize="sm"
            color="neutral.500"
            cursor="pointer"
            onClick={onCopy}
          >
            {hasCopied ? "Copied" : `${text.slice(0, 6)}...${text.slice(text.length - 4)}`}
            {hasCopied ? <CheckIcon style={{ marginLeft: "3px"}} /> : <CopyIcon style={{ marginLeft: "3px" }} />}
          </Text>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={5} className={styles.TooltipContent}>
            <Text fontFamily="body" pb="1">Copy to Clipboard</Text>
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default Address