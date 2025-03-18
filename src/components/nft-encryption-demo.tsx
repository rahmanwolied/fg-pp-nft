'use client';

import { useState } from 'react';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import type { EncryptedNFT } from '@/lib/nft-encryption';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { encryptNFTContent, decryptNFTContent } from '@/lib/nft-encryption';
import { useWalletStore } from '@/lib/store';
import { toast } from 'sonner';
import { Lock, Unlock } from 'lucide-react';

// Function to create access control conditions for NFT approval check
const createNFTApprovalAccessControl = (
  nftContractAddress: string,
  tokenId: string,
  approvedAddress?: string
) => {
  // If no approved address is provided, we'll check if the user is approved for any address
  return [
    {
      contractAddress: nftContractAddress,
      standardContractType: 'ERC721',
      chain: 'ethereum',
      method: 'getApproved',
      parameters: [tokenId],
      returnValueTest: approvedAddress 
        ? {
            comparator: '=',
            value: approvedAddress
          }
        : {
            comparator: '!=',
            value: '0x0000000000000000000000000000000000000000'
          }
    }
  ];
};

// Extended LitNodeClient type to match our implementation
interface ExtendedLitNodeClient extends LitNodeClient {
  saveEncryptionKey: (params: {
    accessControlConditions: any;
    symmetricKey: Buffer;
    authSig: any;
    chain: string;
  }) => Promise<{ encryptedSymmetricKey: Uint8Array; symmetricKeyHash: string }>;
  
  getEncryptionKey: (params: {
    accessControlConditions: any;
    toDecrypt: Buffer;
    chain: string;
    authSig: any;
  }) => Promise<Uint8Array>;
  
  getAuthSig: () => Promise<any>;
}

export function NFTEncryptionDemo() {
  const { currentAccount } = useWalletStore();
  const [nftContent, setNftContent] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [approvedAddress, setApprovedAddress] = useState('');
  const [encryptedNFT, setEncryptedNFT] = useState<EncryptedNFT | null>(null);
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [litClient, setLitClient] = useState<LitNodeClient | null>(null);

  // Initialize Lit client
  const initLitClient = async () => {
    if (litClient) return litClient;
    
    try {
      const client = new LitNodeClient({
        litNetwork: 'serrano' as any, // Type assertion for network name
        debug: false,
      });
      
      await client.connect();
      setLitClient(client);
      return client;
    } catch (error) {
      console.error('Error initializing Lit client:', error);
      toast.error('Failed to initialize Lit Protocol client');
      return null;
    }
  };

  const handleEncrypt = async () => {
    if (!currentAccount) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to encrypt NFT content',
      });
      return;
    }

    if (!nftContent || !nftName || !nftContractAddress || !tokenId) {
      toast.error('Missing information', {
        description: 'Please provide NFT content, name, contract address, and token ID',
      });
      return;
    }

    try {
      setIsEncrypting(true);
      const client = await initLitClient();
      if (!client) return;

      // Create access control conditions for NFT approval
      const accessControlConditions = createNFTApprovalAccessControl(
        nftContractAddress,
        tokenId,
        approvedAddress || undefined
      );

      const encrypted = await encryptNFTContent(
        nftContent,
        { name: nftName, description: nftDescription },
        accessControlConditions,
        client as unknown as ExtendedLitNodeClient
      );

      setEncryptedNFT(encrypted);
      setDecryptedContent(null);
      toast.success('NFT content encrypted successfully');
    } catch (error) {
      console.error('Encryption error:', error);
      toast.error('Failed to encrypt NFT content', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!currentAccount) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to decrypt NFT content',
      });
      return;
    }

    if (!encryptedNFT) {
      toast.error('No encrypted NFT', {
        description: 'Please encrypt an NFT first',
      });
      return;
    }

    try {
      setIsDecrypting(true);
      const client = await initLitClient();
      if (!client) return;

      const decrypted = await decryptNFTContent(
        encryptedNFT,
        client as unknown as ExtendedLitNodeClient,
        false
      );

      setDecryptedContent(decrypted as string);
      toast.success('NFT content decrypted successfully');
    } catch (error) {
      console.error('Decryption error:', error);
      toast.error('Failed to decrypt NFT content', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Encrypted NFT</CardTitle>
          <CardDescription>
            Encrypt your NFT content with AES-256-GCM and secure the key with Lit Protocol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nft-name">NFT Name</Label>
            <Input
              id="nft-name"
              placeholder="My Secret NFT"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nft-description">NFT Description (Optional)</Label>
            <Input
              id="nft-description"
              placeholder="A description of my encrypted NFT"
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nft-content">NFT Content</Label>
            <Textarea
              id="nft-content"
              placeholder="Enter the content you want to encrypt..."
              rows={5}
              value={nftContent}
              onChange={(e) => setNftContent(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nft-contract">NFT Contract Address</Label>
            <Input
              id="nft-contract"
              placeholder="0x..."
              value={nftContractAddress}
              onChange={(e) => setNftContractAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token-id">Token ID</Label>
            <Input
              id="token-id"
              placeholder="1"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="approved-address">Approved Address (Optional)</Label>
            <Input
              id="approved-address"
              placeholder="0x... (leave empty to check for any approval)"
              value={approvedAddress}
              onChange={(e) => setApprovedAddress(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              If left empty, any address with approval for this token can decrypt.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleEncrypt} 
            disabled={isEncrypting || !currentAccount || !nftContent || !nftName || !nftContractAddress || !tokenId}
            className="w-full"
          >
            {isEncrypting ? 'Encrypting...' : 'Encrypt NFT Content'}
          </Button>
        </CardFooter>
      </Card>

      {encryptedNFT && (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Encrypted NFT: {encryptedNFT.name}</span>
              </div>
            </CardTitle>
            <CardDescription>{encryptedNFT.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Encrypted Data (Ready for Minting)</h4>
                <div className="bg-muted rounded-md p-3 max-h-40 overflow-y-auto">
                  <pre className="text-xs whitespace-pre-wrap break-words">
                    <code>{JSON.stringify(encryptedNFT, null, 2)}</code>
                  </pre>
                </div>
              </div>
              
              {decryptedContent && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Unlock className="h-4 w-4" />
                    <span>Decrypted Content</span>
                  </h4>
                  <div className="bg-accent rounded-md p-3">
                    <p className="whitespace-pre-wrap text-sm">{decryptedContent}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleDecrypt}
              disabled={isDecrypting || !currentAccount}
              variant={decryptedContent ? "outline" : "default"}
              className="w-full"
            >
              {isDecrypting ? 'Decrypting...' : decryptedContent ? 'Decrypt Again' : 'Decrypt Content'}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        <p>
          This demo uses AES-256-GCM for content encryption and Lit Protocol for access control.
          <br />
          Only wallets with approval to spend the specified NFT token can decrypt the content.
        </p>
      </div>
    </div>
  );
} 