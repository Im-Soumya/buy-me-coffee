import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployments, ethers, network } from "hardhat";
import { BuyMeCoffee } from "../../typechain-types";
import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { developmentChains } from "../../helper-hardhat-config";

!developmentChains.includes(network.name)
? describe.skip
: describe("Buy Me Coffee unit tests", () => {
    let buyMeCoffee: BuyMeCoffee
    let buyMeCoffeeContract: BuyMeCoffee
    let accounts: SignerWithAddress[]
    let deployer: SignerWithAddress, tipper1: SignerWithAddress, tipper2: SignerWithAddress, tipper3: SignerWithAddress
    let regularTip: BigNumber
    let largeTip: BigNumber
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
        regularTip = ethers.utils.parseEther("0.01")
        largeTip = ethers.utils.parseEther("0.03")
        name = "anonymous"
        message = "Enjoy your coffee"
    })

    describe("constructor", () => {
        it("sets the owner correctly", async () => {
            const owner = await buyMeCoffee.getOwner()
            assert(owner, deployer.address)
        })
    })

    describe("buyRegularCoffee", () => {
        beforeEach(async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
        })
        it("reverts if paid less", async () => {
            await expect(buyMeCoffee.buyRegularCoffee(name, message)).to.be.revertedWith("BuyMeCoffee__NotEnoughETH")
        })
        it("adds the new memo to the memo list", async () => {
            await buyMeCoffee.buyRegularCoffee(name, message, { value: regularTip })
            
            const allMemos = await buyMeCoffee.getMemos()
            for(let memos of allMemos) {
                const address = memos.from
                if(address === tipper1.toString()) {
                    assert(tipper1, address)
                }
            }
        })
        it("emits an event on successfully sending ETH", async () => {
            await expect(buyMeCoffee.buyRegularCoffee(name, message, { value: regularTip})).to.emit( buyMeCoffee, "NewMemo" )
        })
    })

    describe("buyLargeCoffee", () => {
        beforeEach(async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
        })
        it("reverts if paid less", async () => {
            await expect(buyMeCoffee.buyLargeCoffee(name, message)).to.be.revertedWith("BuyMeCoffee__NotEnoughETH")
            await expect(buyMeCoffee.buyLargeCoffee(name, message, { value: ethers.utils.parseEther("0.02") })).to.be.revertedWith("BuyMeCoffee__NotEnoughETH")
        })
        it("adds new memo to this list", async () => {
            await buyMeCoffee.buyLargeCoffee(name, message, { value: largeTip })
            
            const allMemos = await buyMeCoffee.getMemos()
            for(let memo of allMemos) {
                const address = memo.from
                if(address == tipper1.toString()) {
                    assert(tipper1, address)
                }
            }
        })
        it("emits an event", async () => {
            expect(await buyMeCoffee.buyLargeCoffee(name, message, { value: largeTip })).to.emit( buyMeCoffee, "NewMemo" )
        })
    })

    describe("getRegularTip", () => {
        it("the regular tip", async () => {
            const regTip = await buyMeCoffee.getRegularTip()
            assert(regTip, "0.01")
        })
    })

    describe("getLargeTip", () => {
        it("the regular tip", async () => {
            const lgTip = await buyMeCoffee.getLargeTip()
            assert(lgTip, "0.03")
        })
    })

    describe("getOwner", () => {
        it("returns the owner of the contract", async () => {
            const owner = await buyMeCoffee.getOwner()
            assert(owner, deployer.address)
        })
    })

    describe("getBalance", () => {
        it("returns the balance 0 after deployment", async () => {
            const balance = await buyMeCoffee.getBalance()
            assert(balance, "0")
        })
        it("returns the balance after people funded", async () => {
            buyMeCoffee = buyMeCoffeeContract.connect(tipper1)
            await buyMeCoffee.buyRegularCoffee(name, message, { value: regularTip })
            buyMeCoffee = buyMeCoffeeContract.connect(tipper2)
            await buyMeCoffee.buyLargeCoffee(name, message, { value: largeTip })
            const balance = await buyMeCoffee.getBalance()

            assert(balance, (regularTip.add(largeTip)).toString())
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
            await buyMeCoffee.buyRegularCoffee(name, message, { value: regularTip })

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
                await buyMeCoffee.buyRegularCoffee(name, message, {value: regularTip})
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
