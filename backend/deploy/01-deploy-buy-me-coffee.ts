import { DeployFunction } from "hardhat-deploy/types"
import  { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import { developmentChains } from "../helper-hardhat-config"

const deployBuyMeCoffee: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy,log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-------------------------------")
    
    const buyMeCoffee = await deploy("BuyMeCoffee", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1
    })
    
    log("-------------------------------")

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(buyMeCoffee.address, [])
    }
}

export default deployBuyMeCoffee

deployBuyMeCoffee.tags = ["all", "buymecoffee"]

