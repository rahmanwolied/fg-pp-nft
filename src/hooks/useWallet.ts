'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';

export function useWallet() {
	const { address, isConnected } = useAccount();
	const { connect, connectors, isPending } = useConnect();
	const { disconnect } = useDisconnect();
	const { setWalletConnected, setCurrentAccount } = useStore();

	useEffect(() => {
		setWalletConnected(isConnected);
		setCurrentAccount(address || null);
	}, [isConnected, address, setWalletConnected, setCurrentAccount]);

	const connectWallet = async () => {
		try {
			// Connect with the first available connector (usually injected like MetaMask)
			if (connectors.length > 0) {
				connect({ connector: connectors[0] });
			}
		} catch (error) {
			console.error('Error connecting wallet:', error);
		}
	};

	const disconnectWallet = () => {
		disconnect();
	};

	return {
		address,
		isConnected,
		isPending,
		connectWallet,
		disconnectWallet,
	};
}
