'use client';

import { useEffect, useState } from 'react';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { encryptContent as _encryptContent } from '@/lib/lit';
import { initLitClient } from '@/lib/lit';
import { AccessControlConditions } from '@lit-protocol/types';

export function useLitProtocol() {
	const [isInitialized, setIsInitialized] = useState(false);
	const [client, setClient] = useState<LitNodeClient | undefined>();
	const [isEncrypting, setIsEncrypting] = useState(false);
	const [isDecrypting, setIsDecrypting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function initClient() {
			try {
				const client = await initLitClient();
				setClient(client);
				setIsInitialized(true);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Lit client';
				setError(errorMessage);
				throw err;
			}
		}

		initClient();
	}, []);

	const encryptContent = async (content: string, accessControlConditions: AccessControlConditions) => {
		setIsEncrypting(true);
		setError(null);

		try {
			// Convert content to string if it's not already
			const contentString = typeof content === 'string' ? content : JSON.stringify(content);
			const encrypted = await _encryptContent(contentString, accessControlConditions, client);

			return encrypted;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during encryption';
			setError(errorMessage);
			setIsEncrypting(false);
			throw err;
		}
	};

	return {
		encryptContent,
		isEncrypting,
		isDecrypting,
		isInitialized,
		setIsEncrypting,
		setIsDecrypting,
		error,
	};
}
