import { extendTheme } from "@chakra-ui/react"
import { neutralPalette, tealPalette } from "@/lib/constants/colors"

const theme = extendTheme({
    colors: {
        primary: "#10100e",
        neutral: neutralPalette,
        emerald: tealPalette,
    },
    fonts: {
        body: "Plus Jakarta Sans, sans-serif"
    }
})

export { theme }