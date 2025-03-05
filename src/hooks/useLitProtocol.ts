'use client';

import { useState } from 'react';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LIT_CONFIG } from '@/lib/env';

export function useLitProtocol() {
	const [isInitialized, setIsInitialized] = useState(false);
	const [client, setClient] = useState<LitNodeClient | null>(null);
	const [isEncrypting, setIsEncrypting] = useState(false);
	const [isDecrypting, setIsDecrypting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Initialize Lit client
	const initLitClient = async () => {
		try {
			const litClient = new LitJsSdk.LitNodeClient({
				litNetwork: LIT_CONFIG.NETWORK,
			});
			await litClient.connect();
			setClient(litClient);
			setIsInitialized(true);
			return litClient;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Lit client';
			setError(errorMessage);
			throw err;
		}
	};

	// Get or initialize the Lit client
	const getLitClient = async () => {
		if (!isInitialized || !client) {
			return await initLitClient();
		}
		return client;
	};

	// Encrypt content using Lit Protocol
	// See: https://developer.litprotocol.com/concepts/access-control-concept
	const encryptContent = async (content: string, accessControlConditions: any) => {
		setIsEncrypting(true);
		setError(null);

		try {
			const litClient = await getLitClient();

			// Convert content to string if it's not already
			const contentString = typeof content === 'string' ? content : JSON.stringify(content);

			// Encrypt the content
			const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(contentString);

			// Save the encryption key with access control conditions
			const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });

			// Store the encrypted key on the Lit network
			const encryptedSymmetricKey = await litClient.saveEncryptionKey({
				accessControlConditions,
				symmetricKey,
				authSig,
				chain: 'ethereum',
			});

			setIsEncrypting(false);

			// Return both the encrypted content and the encrypted symmetric key
			return {
				encryptedContent: await LitJsSdk.blobToBase64String(encryptedString),
				encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'),
			};
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during encryption';
			setError(errorMessage);
			setIsEncrypting(false);
			throw err;
		}
	};

	// Decrypt content using Lit Protocol
	const decryptContent = async (encryptedContent: string, encryptedSymmetricKey: string, accessControlConditions: any) => {
		setIsDecrypting(true);
		setError(null);

		try {
			const litClient = await getLitClient();

			// Get auth signature
			const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });

			// Convert the encrypted symmetric key back to Uint8Array
			const encryptedSymmetricKeyUint8Array = LitJsSdk.stringToUint8Array(encryptedSymmetricKey, 'base16');

			// Get the decryption key from the Lit network
			const symmetricKey = await litClient.getEncryptionKey({
				accessControlConditions,
				toDecrypt: encryptedSymmetricKeyUint8Array,
				chain: 'ethereum',
				authSig,
			});

			// Convert the encrypted content from base64 to blob
			const encryptedStringBlob = await LitJsSdk.base64StringToBlob(encryptedContent);

			// Decrypt the content
			const decryptedString = await LitJsSdk.decryptString(encryptedStringBlob, symmetricKey);

			setIsDecrypting(false);
			return decryptedString;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during decryption';
			setError(errorMessage);
			setIsDecrypting(false);
			throw err;
		}
	};

	// Create standard access control conditions for NFT ownership
	// See: https://developer.litprotocol.com/concepts/access-control-concept
	const createNftOwnershipAccessControlConditions = (contractAddress: string, chainId: number = 1) => {
		return [
			{
				contractAddress,
				standardContractType: 'ERC721',
				chain: 'ethereum',
				method: 'balanceOf',
				parameters: [':userAddress'],
				returnValueTest: {
					comparator: '>',
					value: '0',
				},
			},
		];
	};

	return {
		encryptContent,
		decryptContent,
		createNftOwnershipAccessControlConditions,
		isEncrypting,
		isDecrypting,
		isInitialized,
		error,
	};
}
