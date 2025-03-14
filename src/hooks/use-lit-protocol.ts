'use client';

import { useEffect, useState } from 'react';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { encryptContent as _encryptContent, generateSessionSignature, decryptContent as _decryptContent } from '@/lib/lit';
import { initLitClient } from '@/lib/lit';
import { AccessControlConditions, EncryptToJsonPayload, SessionSigsMap } from '@lit-protocol/types';

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

	const getSessionSigs = async (accessControlConditions: AccessControlConditions, dataToEncryptHash: string) => {
		if (!client) {
			throw new Error('Lit client not initialized');
		}
		const sessionSigs = await generateSessionSignature(accessControlConditions, dataToEncryptHash, client);

		return sessionSigs;
	};

	const decryptContent = async (encrypted: EncryptToJsonPayload, sessionSigs: SessionSigsMap) => {
		setIsDecrypting(true);
		setError(null);

		try {
			if (!client) {
				throw new Error('Lit client not initialized');
			}

			const decrypted = await _decryptContent(encrypted, sessionSigs, client);
			return decrypted;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error during decryption';
			setError(errorMessage);
			setIsDecrypting(false);
			throw err;
		} finally {
			setIsDecrypting(false);
		}
	};

	return {
		encryptContent,
		decryptContent,
		getSessionSigs,
		isEncrypting,
		isDecrypting,
		isInitialized,
		setIsEncrypting,
		setIsDecrypting,
		error,
	};
}
