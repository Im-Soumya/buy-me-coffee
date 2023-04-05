import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

import { frontEndContractsFile, frontEndAbiFile } from "../helper-hardhat-config"

const updateUI: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { network, ethers } = hre
    const chainId = "31337"

    if(process.env.UPDATE_FRONTEND) {
        console.log("Writing to front end...")
        const buyMeCoffee = await ethers.getContract("BuyMeCoffee")
        const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
        
        if(chainId in contractAddresses) {
            if(!contractAddresses[network.config.chainId!].includes(buyMeCoffee.address)) {
                contractAddresses[network.config.chainId!].push(buyMeCoffee.address)
            }
        } else {
            contractAddresses[network.config.chainId!] = [buyMeCoffee.address]
        }
        
        fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
        fs.writeFileSync(frontEndAbiFile, buyMeCoffee.interface.format(ethers.utils.FormatTypes.json))
        console.log("Front end updated!")
    }
}

export default updateUI
updateUI.tags = ["all", "frontend"]