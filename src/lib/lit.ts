'use client';

import { encryptToJson, decryptFromJson } from '@lit-protocol/encryption';
import { AccessControlConditions, EncryptToJsonPayload, SessionSigsMap } from '@lit-protocol/types';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { LIT_NETWORK } from '@lit-protocol/constants';
import { LIT_CONFIG } from './env';
import { ethers } from 'ethers';
import { LIT_ABILITY } from '@lit-protocol/constants';
import { createSiweMessage, generateAuthSig, LitAccessControlConditionResource } from '@lit-protocol/auth-helpers';

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

export const initContractClient = async () => {
	try {
		const contractClient = new LitContracts({
			network: LIT_NETWORK.DatilDev,
		});
		await contractClient.connect();

		const { capacityTokenIdStr } = await contractClient.mintCapacityCreditsNFT({
			requestsPerKilosecond: 80,
			daysUntilUTCMidnightExpiration: 2,
		});

		return { contractClient, capacityTokenIdStr };
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Failed to initialize contract client';
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

		return (await JSON.parse(encrypted)) as EncryptToJsonPayload;
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error during encryption';
		throw new Error(errorMessage);
	}
};

export const deletageUse = async (litNodeClient: LitNodeClient, capacityTokenIdStr: string, walletAddress: string) => {
	const provider = new ethers.BrowserProvider(window.ethereum);
	const wallet = await provider.getSigner();

	const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
		uses: '1',
		capacityTokenId: capacityTokenIdStr,
		delegateeAddresses: [walletAddress],
		dAppOwnerWallet: wallet,
	});

	return capacityDelegationAuthSig;
};

export const generateSessionSignature = async (
	accessControlConditions: AccessControlConditions,
	dataToEncryptHash: string,
	client?: LitNodeClient
) => {
	const litNodeClient = client || (await initLitClient());

	const provider = new ethers.BrowserProvider(window.ethereum);
	const wallet = await provider.getSigner();

	const sessionSigs = await litNodeClient.getSessionSigs({
		chain: LIT_CONFIG.NETWORK,
		expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
		resourceAbilityRequests: [
			{
				resource: new LitAccessControlConditionResource(
					await LitAccessControlConditionResource.generateResourceString(accessControlConditions, dataToEncryptHash)
				),
				ability: LIT_ABILITY.AccessControlConditionDecryption,
			},
		],
		authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
			const toSign = await createSiweMessage({
				uri,
				expiration,
				resources: resourceAbilityRequests,
				walletAddress: wallet.address,
				nonce: await litNodeClient.getLatestBlockhash(),
				litNodeClient,
				statement: 'I accept the terms and conditions of this NFT',
			});

			return await generateAuthSig({
				signer: wallet,
				toSign,
			});
		},
	});

	return sessionSigs;
};

export const decryptContent = async (encrypted: EncryptToJsonPayload, sessionSigs: SessionSigsMap, client?: LitNodeClient) => {
	const litNodeClient = client || (await initLitClient());

	const decryptionResult = await decryptFromJson({
		litNodeClient,
		parsedJsonData: encrypted,
		sessionSigs,
	});

	return decryptionResult;
};
