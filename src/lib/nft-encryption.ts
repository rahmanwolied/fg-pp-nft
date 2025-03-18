import { encryptFileWithRandomKey, encryptTextWithRandomKey, EncryptedDataWithKey, decryptFileWithKey, decryptTextWithKey } from './crypto';
import type { LitNodeClient } from '@lit-protocol/lit-node-client';
import type { AccsDefaultParams } from '@lit-protocol/types';

/**
 * Represents an encrypted NFT with metadata
 */
export interface EncryptedNFT {
  // NFT metadata
  name: string;
  description: string;
  
  // Encrypted content
  encryptedContent: string;
  iv: string;
  authTag: string;
  
  // Lit Protocol encrypted key data
  encryptedSymmetricKey: string;
  encryptionMetadata: {
    accessControlConditions: AccsDefaultParams;
    encryptedSymmetricKeyHash: string;
  };
}

// Lit Protocol auth signature type
interface AuthSig {
  sig: string;
  derivedVia: string;
  signedMessage: string;
  address: string;
}

// Extended LitNodeClient interface to match the actual Lit Protocol API
interface ExtendedLitNodeClient extends LitNodeClient {
  saveEncryptionKey: (params: {
    accessControlConditions: AccsDefaultParams;
    symmetricKey: Buffer;
    authSig: AuthSig;
    chain: string;
  }) => Promise<{ encryptedSymmetricKey: Uint8Array; symmetricKeyHash: string }>;
  
  getEncryptionKey: (params: {
    accessControlConditions: AccsDefaultParams;
    toDecrypt: Buffer;
    chain: string;
    authSig: AuthSig;
  }) => Promise<Uint8Array>;
  
  getAuthSig: () => Promise<AuthSig>;
}

/**
 * Encrypts NFT content and secures the encryption key with Lit Protocol
 * 
 * @param content - The NFT content to encrypt (text or file buffer)
 * @param metadata - NFT metadata (name, description)
 * @param accessControlConditions - Lit Protocol access control conditions
 * @param litNodeClient - Initialized Lit Protocol client
 * @returns The encrypted NFT data ready for minting
 */
export async function encryptNFTContent(
  content: string | Buffer,
  metadata: { name: string; description: string },
  accessControlConditions: AccsDefaultParams,
  litNodeClient: ExtendedLitNodeClient
): Promise<EncryptedNFT> {
  // Step 1: Encrypt the content with a random key
  const encryptedData = typeof content === 'string'
    ? encryptTextWithRandomKey(content)
    : encryptFileWithRandomKey(content);
  
  // Step 2: Encrypt the symmetric key with Lit Protocol
  const symmetricKey = Buffer.from(encryptedData.key, 'base64');
  
  const { encryptedSymmetricKey, symmetricKeyHash } = await litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig: await litNodeClient.getAuthSig(),
    chain: 'ethereum', // or your preferred chain
  });
  
  // Step 3: Return the encrypted NFT data
  return {
    name: metadata.name,
    description: metadata.description,
    
    encryptedContent: encryptedData.encryptedContent,
    iv: encryptedData.iv,
    authTag: encryptedData.authTag,
    
    encryptedSymmetricKey: Buffer.from(encryptedSymmetricKey).toString('base64'),
    encryptionMetadata: {
      accessControlConditions,
      encryptedSymmetricKeyHash: symmetricKeyHash,
    },
  };
}

/**
 * Decrypts NFT content using Lit Protocol to retrieve the encryption key
 * 
 * @param encryptedNFT - The encrypted NFT data
 * @param litNodeClient - Initialized Lit Protocol client
 * @param isFile - Whether the content is a file (true) or text (false)
 * @returns The decrypted content as string or Buffer
 */
export async function decryptNFTContent(
  encryptedNFT: EncryptedNFT,
  litNodeClient: ExtendedLitNodeClient,
  isFile = false
): Promise<string | Buffer> {
  // Step 1: Get the decrypted symmetric key from Lit Protocol
  const symmetricKey = await litNodeClient.getEncryptionKey({
    accessControlConditions: encryptedNFT.encryptionMetadata.accessControlConditions,
    toDecrypt: Buffer.from(encryptedNFT.encryptedSymmetricKey, 'base64'),
    chain: 'ethereum', // or your preferred chain
    authSig: await litNodeClient.getAuthSig(),
  });
  
  // Step 2: Prepare the encrypted data with the key for decryption
  const encryptedDataWithKey = {
    encryptedContent: encryptedNFT.encryptedContent,
    iv: encryptedNFT.iv,
    authTag: encryptedNFT.authTag,
    key: Buffer.from(symmetricKey).toString('base64')
  };
  
  // Step 3: Decrypt the content
  if (isFile) {
    return decryptFileWithKey(encryptedDataWithKey);
  }
  
  return decryptTextWithKey(encryptedDataWithKey);
} 