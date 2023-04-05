import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployments, ethers, network } from "hardhat";
import { BuyMeCoffee } from "../../typechain-types";
import { assert, expect } from "chai";
import { BigNumber } from "ethers";

!(network.name === "localhost" || network.name === "hardhat")
? describe.skip
: describe("Buy Me Coffee unit tests", () => {
    let buyMeCoffee: BuyMeCoffee
    let buyMeCoffeeContract: BuyMeCoffee
    let accounts: SignerWithAddress[]
    let deployer: SignerWithAddress, tipper1: SignerWithAddress, tipper2: SignerWithAddress, tipper3: SignerWithAddress
    let minTip: BigNumber
    let name: string
    let message: string

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        tipper1 = accounts[1]
        tipper2 = accounts[2]
        tipper3 = accounts[3]

        await deployments.fixture(["buymecoffee"])

        // @ts-ignore
        buyMeCoffeeContract = await ethers.getContract("BuyMeCoffee")
        buyMeCoffee = buyMeCoffeeContract.connect(deployer)
        minTip = ethers.utils.parseEther("1")
        name = "Tim"
        message = "Hey"
    })

    describe("constructor", () => {
        it("sets the owner correctly", async () => {
            const owner = await buyMeCoffee.owner()
            assert(owner, deployer.address)
        })
    })

    describe("buyCoffee", () => {
        beforeEach(async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
        })
        it("reverts if paid less", async () => {
            await expect(buyMeCoffee.buyCoffee(name, message)).to.be.revertedWith("BuyMeCoffee__NotEnoughETH")
        })
        it("adds the new memo to the memo list", async () => {
            await buyMeCoffee.buyCoffee(name, message, { value: minTip })
            
            const allMemos = await buyMeCoffee.getMemos()
            for(let memos of allMemos) {
                const address = memos.from
                if(address === tipper1.toString()) {
                    assert(tipper1, address)
                }
            }
        })
        it("emits an event on successfully sending ETH", async () => {
            await expect(buyMeCoffee.buyCoffee(name, message, { value: minTip})).to.emit( buyMeCoffee, "NewMemo" )
        })
    })

    describe("withdraw", () => {
        it("reverts if not owner", async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
            await expect(buyMeCoffee.withdraw()).to.be.revertedWith("BuyMeCoffee__NotOwner")
        })
        it("reverts if balance is zero", async () => {
            await expect(buyMeCoffee.withdraw()).to.be.revertedWith("BuyMeCoffee__NoFundsToWithdraw")
        })
        it("transfers funds to owner", async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
            await buyMeCoffee.buyCoffee(name, message, { value: minTip })

            buyMeCoffee = buyMeCoffeeContract.connect(deployer)
            await buyMeCoffee.withdraw()

            const contractBalance = await ethers.provider.getBalance(buyMeCoffee.address)
            assert(contractBalance, "0")
        })
        it("owner receives the funds correctly", async () => {
            let beforeOwnerBalance = ethers.utils.formatEther(await deployer.getBalance())

            let addresses = [tipper1, tipper2, tipper3]
            for(let address of addresses) {
                buyMeCoffee = buyMeCoffeeContract.connect(address)
                await buyMeCoffee.buyCoffee(name, message, {value: minTip})
            }
            const contractBalance = ethers.utils.formatEther(await ethers.provider.getBalance(buyMeCoffee.address))

            buyMeCoffee = buyMeCoffeeContract.connect(deployer)
            await buyMeCoffee.withdraw()

            const afterOwnerBalance = ethers.utils.formatEther(await deployer.getBalance())

            assert(beforeOwnerBalance, "9999.998479193125") // owner balance after deploying the contract 
            assert(afterOwnerBalance, beforeOwnerBalance + contractBalance) // owner balance after multiple tips and withdrawing them
        })
    })
})
