import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { createPublicClient, http } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { network } from "hardhat";

// Define the Ignition module for deploying the PrivacyNFT contract
const PrivacyNFTModule = buildModule("PrivacyNFTModule", (m) => {
  // Deploy the PrivacyNFT contract
  const privacyNFT = m.contract("PrivacyNFT");
  
  return { privacyNFT };
});

async function main() {
  console.log("Deploying PrivacyNFT contract using Hardhat Ignition...");
  
  try {
    // Get the current network configuration
    const networkName = network.name;
    console.log(`Deploying to network: ${networkName}`);
    
    // Create a viem public client for the current network
    const chain = networkName === "hardhat" ? hardhat : 
                  networkName === "sepolia" ? sepolia : 
                  hardhat;
    
    const client = createPublicClient({
      chain,
      transport: http(),
    });
    
    // Log deployment start
    console.log("Starting deployment...");
    console.log("This will deploy the PrivacyNFT contract with the following features:");
    console.log("- ERC721 token with privacy features for encrypted content");
    console.log("- Support for storing encrypted content metadata on-chain");
    console.log("- Access control based on token approvals");
    console.log("- Functions for managing encrypted content");
    
    console.log("\nAfter deployment:");
    console.log("1. Install OpenZeppelin contracts if not already installed:");
    console.log("   npm install @openzeppelin/contracts");
    console.log("2. Verify the contract on Etherscan (if deployed to a public network):");
    console.log(`   npx hardhat verify --network ${networkName} CONTRACT_ADDRESS`);
    console.log("3. Interact with the contract using the provided functions");
    
    console.log("\nDeployment module prepared. To execute the deployment, run:");
    console.log("npx hardhat ignition deploy ./scripts/deploy-privacy-nft.ts");
  } catch (error) {
    console.error("Error preparing deployment:", error);
    process.exit(1);
  }
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment preparation failed:", error);
    process.exit(1);
  });

// Export the module for Hardhat Ignition
export default PrivacyNFTModule; 