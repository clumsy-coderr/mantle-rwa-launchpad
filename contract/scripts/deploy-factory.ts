import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function deployRWAFactory() {
  const CONTRACT_NAME = "RWAFactory";
  const [deployer] = await ethers.getSigners();
  const deployerAddress = deployer.address;
  const deployerBalance = await ethers.provider.getBalance(deployerAddress);
  const deployerBalanceInEth = ethers.formatEther(deployerBalance);
  
  console.log("Deploying RWAFactory...");
  console.log("Deployer Address:", deployerAddress);
  console.log("Deployer Balance:", deployerBalanceInEth, "ETH");
  
  // Get initial owner address from env or use deployer
  let initialOwner = process.env.INITIAL_OWNER_ADDRESS || deployerAddress;
  
  // Validate address format
  if (!ethers.isAddress(initialOwner)) {
    throw new Error(`Invalid initial owner address: ${initialOwner}`);
  }
  
  console.log("Initial Owner Address:", initialOwner);
  
  const factory = await ethers.deployContract(CONTRACT_NAME, [initialOwner]);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("Deployed RWAFactory Contract Address:", factoryAddress);
  
  // Verify the owner was set correctly
  const owner = await factory.owner();
  console.log("Owner set to:", owner);
  
  // Verify owner matches expected address
  if (owner.toLowerCase() !== initialOwner.toLowerCase()) {
    throw new Error(`Owner mismatch! Expected ${initialOwner}, got ${owner}`);
  }
  
  // Optionally save deployment info to a file
  const network = await ethers.provider.getNetwork();
  const deploymentInfo = {
    contractName: CONTRACT_NAME,
    address: factoryAddress,
    deployer: deployerAddress,
    owner: owner,
    network: network.name,
    chainId: network.chainId.toString(),
    deployedAt: new Date().toISOString(),
  };
  
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, `${CONTRACT_NAME}-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to:", deploymentFile);
  
  return factoryAddress;
}

async function main() {
  await deployRWAFactory();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

