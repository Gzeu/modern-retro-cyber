import { ethers } from "hardhat";
import { ModernRetroCyberToken } from "../typechain-types";

async function main() {
  console.log("Deploying ModernRetroCyberToken...");
  
  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Deploy the contract
  const TokenFactory = await ethers.getContractFactory("ModernRetroCyberToken");
  const token = await TokenFactory.deploy() as ModernRetroCyberToken;
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  
  console.log("ModernRetroCyberToken deployed to:", tokenAddress);
  
  // Verify deployment
  const name = await token.name();
  const symbol = await token.symbol();
  const totalSupply = await token.totalSupply();
  const maxSupply = await token.MAX_SUPPLY();
  
  console.log("Token Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Initial Supply:", ethers.formatEther(totalSupply), "MRC");
  console.log("- Max Supply:", ethers.formatEther(maxSupply), "MRC");
  
  // Set up initial game parameters
  console.log("\nSetting up initial game parameters...");
  
  const miningRate = await token.baseMiningRate();
  const levelMultiplier = await token.levelMultiplier();
  const cooldown = await token.miningCooldown();
  
  console.log("Game Configuration:");
  console.log("- Base Mining Rate:", ethers.formatEther(miningRate), "MRC per mine");
  console.log("- Level Multiplier:", levelMultiplier.toString(), "basis points");
  console.log("- Mining Cooldown:", cooldown.toString(), "seconds");
  
  // Save deployment info
  const deploymentInfo = {
    network: await ethers.provider.getNetwork(),
    contractAddress: tokenAddress,
    deployerAddress: deployer.address,
    blockNumber: await ethers.provider.getBlockNumber(),
    timestamp: new Date().toISOString()
  };
  
  console.log("\nDeployment Info:", JSON.stringify(deploymentInfo, null, 2));
  
  return {
    token,
    address: tokenAddress,
    deployer: deployer.address
  };
}

// Execute deployment
main()
  .then((result) => {
    console.log("\n✅ Deployment completed successfully!");
    console.log(`Contract Address: ${result.address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
