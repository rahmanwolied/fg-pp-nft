# Text NFT Minter

A simple prototype application for minting encrypted text NFTs using Lit Protocol and storing them on IPFS.

## Project Overview

This application allows users to:

1. Connect their Ethereum wallet (using viem/wagmi)
2. Create text-based NFTs with encrypted content
3. Store the encrypted content on IPFS
4. View and decrypt their NFTs

## Technology Stack

- **Framework**: Next.js 15 with TypeScript and ESLint
- **Web3 Integration**: viem and wagmi for blockchain interactions
- **State Management**: zustand for global state and React Query for data fetching/caching
- **UI Components**: shadcn components for a modern, responsive design
- **Encryption**: Lit Protocol for content encryption and access control
- **Storage**: IPFS via web3.storage for storing encrypted content

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- An Ethereum wallet (MetaMask recommended)
- API keys for the following services:
  - Web3.Storage (for IPFS storage)
  - WalletConnect Project ID (optional, for WalletConnect integration)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_WEB3_STORAGE_API_KEY=your_web3_storage_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia testnet by default
NEXT_PUBLIC_LIT_NETWORK=serrano  # 'serrano' for testnet, 'habanero' for mainnet
```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

### Encryption Process

1. **Content Creation**: User enters text content to be minted as an NFT
2. **Encryption**: The content is encrypted using Lit Protocol
   - See [Lit Protocol encryption documentation](https://developer.litprotocol.com/concepts/access-control-concept)
3. **Access Control**: Access control conditions are set based on NFT ownership
4. **IPFS Storage**: The encrypted content is stored on IPFS via web3.storage
5. **NFT Minting**: In a production application, an NFT would be minted with metadata pointing to the IPFS content

### Decryption Process

1. **Authentication**: User connects their wallet
2. **Access Verification**: Lit Protocol verifies the user meets the access control conditions
3. **Key Retrieval**: If conditions are met, the decryption key is retrieved
4. **Content Decryption**: The encrypted content is decrypted and displayed to the user

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: UI components including NFT minter form and NFT list
- `/src/hooks`: Custom hooks for wallet connection, IPFS storage, and Lit Protocol
- `/src/lib`: Utility functions, store, and configuration

## Resources

- [Lit Protocol Documentation](https://developer.litprotocol.com/what-is-lit)
- [Web3.Storage Documentation](https://web3.storage/docs/)
- [viem Documentation](https://viem.sh/)
- [wagmi Documentation](https://wagmi.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## Limitations

This is a prototype application with the following limitations:

- No actual NFT minting (would require a deployed smart contract)
- Simplified access control conditions
- Local state management (no persistence between sessions)
- Basic error handling

## License

MIT

