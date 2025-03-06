'use client';

import { uploadJson } from '@/lib/pinata';
import { useState } from 'react';

export function useIPFS() {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Upload data to IPFS
	const uploadToIPFS = async (content: object, filename = 'encrypted-nft.json') => {
		setIsUploading(true);
		setError(null);

		try {
			const res = await uploadJson(content, filename);

			console.log('res', res);

			setIsUploading(false);
			return res;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during IPFS upload';
			setError(errorMessage);
			setIsUploading(false);
			throw err;
		}
	};

	return {
		uploadToIPFS,
		setIsUploading,
		isUploading,
		error,
	};
}
