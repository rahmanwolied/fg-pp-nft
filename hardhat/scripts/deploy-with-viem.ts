import { createWalletClient, createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { hardhat, sepolia } from 'viem/chains';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// Import dotenv with require to avoid type issues
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get private key from environment variables
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error('Missing PRIVATE_KEY environment variable');
  process.exit(1);
}

// Create account from private key
const account = privateKeyToAccount(`0x${privateKey}`);

async function main() {
  console.log('Deploying PrivacyNFT contract using viem...');

  try {
    // Determine which network to use
    const networkArg = process.argv[2] || 'hardhat';
    const chain = networkArg === 'sepolia' ? sepolia : hardhat;
    console.log(`Deploying to network: ${chain.name}`);

    // Create wallet client
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });

    // Create public client
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    // Read contract ABI and bytecode
    const contractPath = join(__dirname, '../artifacts/contracts/PrivacyNFT.sol/PrivacyNFT.json');
    const contractJson = JSON.parse(readFileSync(contractPath, 'utf8'));
    const abi = contractJson.abi;
    const bytecode = contractJson.bytecode;

    console.log('Deploying contract...');
    
    // Deploy contract
    const hash = await walletClient.deployContract({
      abi,
      bytecode,
      account,
      args: [], // Add empty args array for constructor (no arguments needed)
    });

    console.log(`Transaction hash: ${hash}`);
    console.log('Waiting for transaction to be mined...');

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    console.log(`Contract deployed at: ${receipt.contractAddress}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    console.log(`Block number: ${receipt.blockNumber}`);

    if (chain.id !== hardhat.id) {
      console.log('\nTo verify the contract on Etherscan, run:');
      console.log(`npx hardhat verify --network ${networkArg} ${receipt.contractAddress}`);
    }

    return receipt.contractAddress;
  } catch (error) {
    console.error('Error deploying contract:', error);
    process.exit(1);
  }
}

// Execute the deployment
main()
  .then((address) => {
    console.log(`\nDeployment successful! Contract address: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 