// @ts-ignore
import { ethers } from "hardhat";

async function main() {
  // @ts-ignore
  const buyMeCoffee = await ethers.getContract("BuyMeCoffee")
  
  console.log(`Before withdraw, balance of contract: ${await ethers.provider.getBalance(buyMeCoffee.address)}`)
  await buyMeCoffee.withdraw()
  console.log(`After withdraw, balance of contract: ${await ethers.provider.getBalance(buyMeCoffee.address)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
