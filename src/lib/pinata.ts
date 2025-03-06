'use server';

import { PinataSDK } from 'pinata-web3';
import { PINATA_CONFIG } from '@/lib/env';

const PinataClient = new PinataSDK({
	pinataJwt: PINATA_CONFIG.PINATA_JWT || '',
	pinataGateway: PINATA_CONFIG.PINATA_GATEWAY || '',
});

export const uploadJson = async (content: object, filename = 'encrypted-nft.json') => {
	try {
		const upload = await PinataClient.upload.json(content).addMetadata({ name: filename });
		return upload;
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error during IPFS upload';
		throw new Error(errorMessage);
	}
};
