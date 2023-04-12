import { ethers } from "ethers"

export interface INetworkConfig {
    name?: string,
    regularTip? : string
    largeTip? : string
}

export interface INetworkConfigInfo {
    [key: number]: INetworkConfig
}

export const networkConfig: INetworkConfigInfo = {
    31337: {
        name: "localhost",
        regularTip: ethers.utils.parseEther("0.01").toString(),
        largeTip: ethers.utils.parseEther("0.03").toString()
    },
    11155111: {
        name: "sepolia",
        regularTip: ethers.utils.parseEther("0.01").toString(),
        largeTip: ethers.utils.parseEther("0.03").toString(),
    },
    80001: {
        name: "mumbai",
        regularTip: ethers.utils.parseEther("0.01").toString(),
        largeTip: ethers.utils.parseEther("0.03").toString(),
    }
}

export const developmentChains = ["hardhat", "localhost"]
export const frontEndContractsFile = "../frontend/constants/contractAddresses.json"
export const frontEndAbiFile = "../frontend/constants/abi.json"