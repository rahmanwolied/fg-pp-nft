# Encrypted NFT with Lit Protocol Access Control

This project demonstrates how to create encrypted NFTs using AES-256-GCM for content encryption and Lit Protocol for access control.

## Architecture

The implementation follows a secure "envelope encryption" pattern:

1. **Content Encryption**: NFT content is encrypted using AES-256-GCM with a randomly generated key
2. **Key Protection**: The encryption key is then encrypted using Lit Protocol's access control system
3. **Access Control**: Only users with approval to spend the specified NFT token can decrypt the key

This approach provides several benefits:
- Separation of content encryption from access control
- Efficient encryption of large content
- Granular access control through Lit Protocol's condition system
- NFT-based access control for decentralized content permissions

## Implementation Details

### Access Control Mechanism

The system uses ERC721's approval mechanism to control access to encrypted content:

1. **Token Approval Check**: The access control condition verifies if a wallet has been approved to spend a specific NFT token
2. **Flexible Permissions**: Can be configured to check for approval for:
   - A specific approved address (targeted permission)
   - Any non-zero address (general permission)
3. **Standard Compliance**: Works with any ERC721-compliant NFT contract

### Encryption Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  NFT Content │────▶│  AES-256-GCM │────▶│  Encrypted  │
└─────────────┘     │  Encryption  │     │   Content   │
                    └─────────────┘     └─────────────┘
                          │
                          │ Generates
                          ▼
                    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                    │  Secret Key  │────▶│ Lit Protocol │────▶│  Encrypted  │
                    └─────────────┘     │  Encryption  │     │     Key     │
                                        └─────────────┘     └─────────────┘
```

### Decryption Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  NFT Token   │────▶│ Lit Protocol │────▶│ Decrypted   │
│  Approval    │     │  Decryption  │     │    Key      │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              │
┌─────────────┐     ┌─────────────┐          │
│  Encrypted  │────▶│  AES-256-GCM │◀─────────┘
│   Content   │     │  Decryption  │
└─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Decrypted  │
                    │   Content   │
                    └─────────────┘
```

## Security Considerations

- **Key Management**: The AES key is never exposed directly to users
- **Authenticated Encryption**: AES-GCM provides both confidentiality and integrity
- **Access Control**: Lit Protocol ensures only authorized users can decrypt the content
- **On-chain Storage**: Only encrypted data is stored on-chain, protecting privacy
- **NFT-based Access**: Leverages existing NFT approval mechanisms for permission management

## Technologies Used

- **AES-256-GCM**: Industry-standard symmetric encryption
- **Lit Protocol**: Decentralized access control network
- **Next.js**: React framework for the frontend
- **TypeScript**: Type-safe JavaScript
- **ERC721**: NFT standard for access control

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Connect your wallet and try encrypting/decrypting NFT content

## Usage Example

```typescript
// Create access control conditions for NFT approval
const accessControlConditions = createNFTApprovalAccessControl(
  "0x123...abc", // NFT contract address
  "42",          // Token ID
  "0x456...def"  // Optional: specific approved address
);

// Encrypt NFT content
const encryptedNFT = await encryptNFTContent(
  "My secret NFT content",
  { name: "Secret NFT", description: "This NFT is encrypted" },
  accessControlConditions,
  litNodeClient
);

// Store the encrypted NFT data on-chain or in storage

// Later, decrypt the content (only works if user's wallet is approved for the token)
const decryptedContent = await decryptNFTContent(
  encryptedNFT,
  litNodeClient
);
```

## License

MIT

