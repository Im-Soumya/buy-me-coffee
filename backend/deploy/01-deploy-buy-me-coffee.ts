import { DeployFunction } from "hardhat-deploy/types"
import  { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import { developmentChains, networkConfig } from "../helper-hardhat-config"

const deployBuyMeCoffee: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy,log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("-------------------------------")
    
    const args = [networkConfig[chainId!]["regularTip"], networkConfig[chainId!]["largeTip"]]

    const buyMeCoffee = await deploy("BuyMeCoffee", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1
    })
    
    log("-------------------------------")

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(buyMeCoffee.address, args)
    }
}

export default deployBuyMeCoffee

deployBuyMeCoffee.tags = ["all", "buymecoffee"]

