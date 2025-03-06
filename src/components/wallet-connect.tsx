'use client';

import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function WalletConnect() {
	const { isConnected, address, isPending, connectWallet, disconnectWallet } = useWallet();

	useEffect(() => {
		if (isConnected && address) {
			toast.success('Wallet connected', {
				description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
			});
		}
	}, [isConnected, address]);

	const handleConnect = async () => {
		try {
			await connectWallet();
		} catch (error) {
			toast.error('Failed to connect wallet', {
				description: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	};

	const handleDisconnect = () => {
		disconnectWallet();
		toast.info('Wallet disconnected');
	};

	return (
		<div className="flex justify-center">
			{isConnected ? (
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage src="/logo.png" alt="Rahman Wolied" />
						<AvatarFallback>{address?.slice(1, 3)}</AvatarFallback>
					</Avatar>
					<p className="text-sm text-muted-foreground">
						{address?.slice(0, 6)}...{address?.slice(-4)}
					</p>
					<Button variant="default" onClick={handleDisconnect}>
						Disconnect Wallet
					</Button>
				</div>
			) : (
				<Button onClick={handleConnect} disabled={isPending}>
					{isPending ? 'Connecting...' : 'Connect Wallet'}
				</Button>
			)}
		</div>
	);
}
