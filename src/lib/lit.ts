'use client';

import { encryptToJson, decryptFromJson } from '@lit-protocol/encryption';
import { AccessControlConditions } from '@lit-protocol/types';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { LIT_NETWORK } from '@lit-protocol/constants';
import { LIT_CONFIG } from './env';

export type ACC = AccessControlConditions;

export const initLitClient = async () => {
	try {
		const litNodeClient = new LitNodeClient({
			litNetwork: LIT_NETWORK.DatilDev,
			debug: false,
		});
		await litNodeClient.connect();
		return litNodeClient;
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Lit client';
		throw new Error(errorMessage);
	}
};

export const encryptContent = async (content: string, accessControlConditions: AccessControlConditions, client?: LitNodeClient) => {
	try {
		const litNodeClient = client || (await initLitClient());

		const encrypted = await encryptToJson({
			accessControlConditions,
			string: content,
			litNodeClient,
			chain: LIT_CONFIG.NETWORK,
		});

		return await JSON.parse(encrypted);
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error during encryption';
		throw new Error(errorMessage);
	}
};

// // Decrypt content using Lit Protocol
// const decryptContent = async (encryptedContent: string, encryptedSymmetricKey: string, accessControlConditions: any) => {
// 	setIsDecrypting(true);
// 	setError(null);

// 	try {
// 		const litClient = await getLitClient();

// 		// Get auth signature
// 		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });

// 		// Convert the encrypted symmetric key back to Uint8Array
// 		const encryptedSymmetricKeyUint8Array = LitJsSdk.stringToUint8Array(encryptedSymmetricKey, 'base16');

// 		// Get the decryption key from the Lit network
// 		const symmetricKey = await litClient.getEncryptionKey({
// 			accessControlConditions,
// 			toDecrypt: encryptedSymmetricKeyUint8Array,
// 			chain: 'ethereum',
// 			authSig,
// 		});

// 		// Convert the encrypted content from base64 to blob
// 		const encryptedStringBlob = await LitJsSdk.base64StringToBlob(encryptedContent);

// 		// Decrypt the content
// 		const decryptedString = await LitJsSdk.decryptString(encryptedStringBlob, symmetricKey);

// 		setIsDecrypting(false);
// 		return decryptedString;
// 	} catch (err) {
// 		const errorMessage = err instanceof Error ? err.message : 'Unknown error during decryption';
// 		setError(errorMessage);
// 		setIsDecrypting(false);
// 		throw err;
// 	}
// };

// // Create standard access control conditions for NFT ownership
// // See: https://developer.litprotocol.com/concepts/access-control-concept
// const createNftOwnershipAccessControlConditions = (contractAddress: string, chainId: number = 1) => {
// 	return [
// 		{
// 			contractAddress,
// 			standardContractType: 'ERC721',
// 			chain: 'ethereum',
// 			method: 'balanceOf',
// 			parameters: [':userAddress'],
// 			returnValueTest: {
// 				comparator: '>',
// 				value: '0',
// 			},
// 		},
// 	];
// };
