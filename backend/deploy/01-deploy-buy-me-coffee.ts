import { DeployFunction } from "hardhat-deploy/types"
import  { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"

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

    if(network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(buyMeCoffee.address, [])
    }
}

export default deployBuyMeCoffee

deployBuyMeCoffee.tags = ["all", "buymecoffee"]

