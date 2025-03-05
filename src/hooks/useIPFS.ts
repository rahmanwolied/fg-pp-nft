'use client';

import PinataClient from '@/lib/pinata';
import { PINATA_CONFIG } from '@/lib/env';
import { useState } from 'react';

export function useIPFS() {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Create a Web3Storage client
	const getClient = () => {
		if (!PINATA_CONFIG.PINATA_JWT) {
			throw new Error('Web3.Storage API key is not configured');
		}

		return PinataClient;
	};

	// Upload data to IPFS
	const uploadToIPFS = async (content: string, filename = 'encrypted-nft.json') => {
		setIsUploading(true);
		setError(null);

		try {
			const client = getClient();

			// Create a JSON blob
			const blob = new Blob([content], { type: 'application/json' });
			const file = new File([blob], filename);

			// Upload to IPFS
			const upload = await client.upload.file(file);

			setIsUploading(false);
			return upload;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during IPFS upload';
			setError(errorMessage);
			setIsUploading(false);
			throw err;
		}
	};

	// Retrieve data from IPFS
	const retrieveFromIPFS = async (cid: string) => {
		try {
			const client = getClient();
			const res = await client.gateways.get(cid);

			if (!res) {
				throw new Error(`Failed to retrieve data`);
			}

			return { content: res.data, type: res.contentType };
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during IPFS retrieval';
			setError(errorMessage);
			throw err;
		}
	};

	return {
		uploadToIPFS,
		retrieveFromIPFS,
		isUploading,
		error,
	};
}
