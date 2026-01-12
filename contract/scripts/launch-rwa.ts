import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { RWAFactory } from "../typechain-types/contracts/RWAFactory";

interface RWAPropertyParams {
  assetName: string;
  assetType: string;
  description: string;
  isOwner: boolean;
  approximatedValue: bigint; // in USD with 18 decimals
  totalSupply: bigint;
  propertyAddress: string;
  squareMeters: bigint;
  uri: string;
}

function getPropertyParams(): RWAPropertyParams {
  // Get parameters from environment variables or use defaults
  const assetName = process.env.ASSET_NAME || "Real Estate Property";
  const assetType = process.env.ASSET_TYPE || "Real Estate";
  const description = process.env.DESCRIPTION || "A tokenized real estate property";
  const isOwner = true; // Default to true
  const approximatedValueUSD = parseFloat(process.env.APPROXIMATED_VALUE_USD || "1000000"); // Default 1M USD
  const totalSupply = BigInt(process.env.TOTAL_SUPPLY || "1000000"); // Default 1M tokens
  const propertyAddress = process.env.PROPERTY_ADDRESS || "123 Main St, City, Country";
  const squareMeters = BigInt(process.env.SQUARE_METERS || "10000"); // Default 100 sqm
  const uri = process.env.METADATA_URI || "https://gateway.pinata.cloud/ipfs/bafkreihm7v5io3okn6cfwfds265jvv3euyokcoeesf42cap7owpspovvu4";

  // Convert USD value to wei (18 decimals)
  const approximatedValue = ethers.parseUnits(approximatedValueUSD.toFixed(18), 18);

  return {
    assetName,
    assetType,
    description,
    isOwner,
    approximatedValue,
    totalSupply,
    propertyAddress,
    squareMeters,
    uri,
  };
}

async function launchRWAProperty() {
  // Get factory contract address
  const factoryAddress = process.env.FACTORY_ADDRESS;
  if (!factoryAddress || !ethers.isAddress(factoryAddress)) {
    throw new Error(
      `Invalid or missing FACTORY_ADDRESS environment variable.\n` +
      `Please set FACTORY_ADDRESS to a valid contract address.`
    );
  }

  console.log("=".repeat(80));
  console.log("Launching RWA Property via Factory Contract");
  console.log("=".repeat(80));

  // Get deployer (the one who will call launchProperty)
  const [deployer] = await ethers.getSigners();
  const deployerAddress = deployer.address;
  const deployerBalance = await ethers.provider.getBalance(deployerAddress);
  const deployerBalanceInEth = ethers.formatEther(deployerBalance);

  console.log("\nDeployer Information:");
  console.log(`  Address: ${deployerAddress}`);
  console.log(`  Balance: ${deployerBalanceInEth} ETH`);

  // Get factory contract instance
  console.log(`\nFactory Contract Address: ${factoryAddress}`);
  const RWAFactoryFactory = await ethers.getContractFactory("RWAFactory");
  const factory = RWAFactoryFactory.attach(factoryAddress) as RWAFactory;

  // Verify factory contract is valid
  try {
    const owner = await factory.owner();
    console.log(`  Factory Owner: ${owner}`);
  } catch (error) {
    throw new Error(
      `Failed to connect to factory contract at ${factoryAddress}.\n` +
      `Please verify the address is correct and the contract is deployed.`
    );
  }

  // Get property parameters
  const params = getPropertyParams();

  console.log("\n" + "=".repeat(80));
  console.log("Property Parameters:");
  console.log("=".repeat(80));
  console.log(`  Asset Name: ${params.assetName}`);
  console.log(`  Asset Type: ${params.assetType}`);
  console.log(`  Description: ${params.description}`);
  console.log(`  Is Owner: ${params.isOwner}`);
  console.log(`  Approximated Value: ${ethers.formatEther(params.approximatedValue)} USD`);
  console.log(`  Total Supply: ${params.totalSupply.toString()} tokens`);
  console.log(`  Property Address: ${params.propertyAddress}`);
  console.log(`  Square Meters: ${params.squareMeters.toString()} sqm`);
  console.log(`  Metadata URI: ${params.uri}`);

  // Validate parameters
  if (params.assetName.length === 0) {
    throw new Error("Asset name cannot be empty");
  }
  if (params.assetType.length === 0) {
    throw new Error("Asset type cannot be empty");
  }
  if (params.description.length === 0) {
    throw new Error("Description cannot be empty");
  }
  if (params.approximatedValue <= 0n) {
    throw new Error("Approximated value must be positive");
  }
  if (params.totalSupply <= 0n) {
    throw new Error("Total supply must be positive");
  }
  if (params.uri.length === 0) {
    throw new Error("Metadata URI cannot be empty");
  }

  console.log("\n" + "=".repeat(80));
  console.log("Launching Property...");
  console.log("=".repeat(80));

  try {
    // Call launchProperty
    const tx = await factory
      .connect(deployer)
      .launchProperty(
        params.assetName,
        params.assetType,
        params.description,
        params.isOwner,
        params.approximatedValue,
        params.totalSupply,
        params.propertyAddress,
        params.squareMeters,
        params.uri
      );

    console.log(`\nTransaction sent: ${tx.hash}`);
    console.log("Waiting for confirmation...");

    const receipt = await tx.wait();

    if (!receipt) {
      throw new Error("Transaction receipt is null");
    }

    // Parse the PropertyLaunched event
    const event = receipt.logs.find((log) => {
      try {
        const parsed = factory.interface.parseLog(log);
        return parsed?.name === "PropertyLaunched";
      } catch {
        return false;
      }
    });

    let propertyAddress: string | null = null;
    if (event) {
      const parsed = factory.interface.parseLog(event);
      if (parsed) {
        propertyAddress = parsed.args.propertyContract as string;
      }
    }

    // If event parsing failed, try to get the property address from the transaction
    if (!propertyAddress) {
      // Get the latest property count and fetch the last property
      const propertyCount = await factory.getPropertyCount();
      if (propertyCount > 0n) {
        propertyAddress = await factory.getProperty(propertyCount - 1n);
      }
    }

    console.log("\n" + "=".repeat(80));
    console.log("✅ SUCCESS!");
    console.log("=".repeat(80));
    console.log(`Transaction Hash: ${receipt.hash}`);
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`\nProperty Contract Address: ${propertyAddress || "N/A"}`);

    // Get property info from the factory
    if (propertyAddress) {
      try {
        const propertyInfo = await factory.getPropertyInfo(propertyAddress);
        console.log("\nProperty Information:");
        console.log("-".repeat(80));
        console.log(`  Asset Name: ${propertyInfo.assetName}`);
        console.log(`  Asset Type: ${propertyInfo.assetType}`);
        console.log(`  Description: ${propertyInfo.description}`);
        console.log(`  Is Owner: ${propertyInfo.isOwner}`);
        console.log(`  Approximated Value: ${ethers.formatEther(propertyInfo.approximatedValue)} USD`);
        console.log(`  Total Supply: ${propertyInfo.totalSupply.toString()} tokens`);
        console.log(`  Property Address: ${propertyInfo.propertyAddress}`);
        console.log(`  Square Meters: ${propertyInfo.squareMeters.toString()} sqm`);
      } catch (error) {
        console.log("\n⚠️  Could not fetch property info (property may still be initializing)");
      }
    }

    // Save deployment info
    const network = await ethers.provider.getNetwork();
    const deploymentInfo = {
      propertyAddress: propertyAddress || "N/A",
      factoryAddress: factoryAddress,
      issuer: deployerAddress,
      params: {
        assetName: params.assetName,
        assetType: params.assetType,
        description: params.description,
        isOwner: params.isOwner,
        approximatedValueUSD: ethers.formatEther(params.approximatedValue),
        totalSupply: params.totalSupply.toString(),
        propertyAddress: params.propertyAddress,
        squareMeters: params.squareMeters.toString(),
        uri: params.uri,
      },
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber.toString(),
      gasUsed: receipt.gasUsed.toString(),
      network: network.name,
      chainId: network.chainId.toString(),
      launchedAt: new Date().toISOString(),
    };

    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(
      deploymentsDir,
      `RWAProperty-${Date.now()}.json`
    );
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\nDeployment info saved to: ${deploymentFile}`);

    return propertyAddress;
  } catch (error: any) {
    console.error("\n❌ Error launching property:", error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
    if (error.data) {
      console.error("Error Data:", error.data);
    }
    throw error;
  }
}

async function main() {
  await launchRWAProperty();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

