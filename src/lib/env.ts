// Environment variables configuration

// Web3 Configuration
export const PINATA_CONFIG = {
	PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT || '',
	PINATA_GATEWAY: process.env.NEXT_PUBLIC_PINATA_GATEWAY || '',
	PINATA_GATEWAY_KEY: process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY || '',
};

// Lit Protocol Configuration
export const LIT_CONFIG = {
	NETWORK: process.env.NEXT_PUBLIC_LIT_NETWORK || 'serrano', // 'serrano' for testnet, 'habanero' for mainnet
};

// NFT Contract Configuration
export const NFT_CONFIG = {
	CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '',
	CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '11155111', // Sepolia testnet by default
};
