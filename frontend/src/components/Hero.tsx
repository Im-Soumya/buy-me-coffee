import { Flex, FormControl, Input, Heading, Tab, TabList, TabPanels, TabPanel, Tabs, Button, TabIndicator } from "@chakra-ui/react"

const Hero = () => {
  return (
    <Flex direction="column" minH="100vh" alignItems="center" justifyContent="center" gap="10">
        <Heading size={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }} color="teal.50" fontFamily="body">
            Buy Heisenberg a Coffee!
        </Heading>
    </Flex>
  )
}

export default Hero