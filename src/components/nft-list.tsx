'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useStore } from '@/lib/store';
import { useLitProtocol } from '@/hooks/use-lit-protocol';
import { Lock } from 'lucide-react';

export function NFTList() {
	const { currentAccount } = useStore();
	const { isDecrypting } = useLitProtocol();
	const [decryptingId, setDecryptingId] = useState<string | null>(null);
	const [decryptedContents, setDecryptedContents] = useState<Record<string, string>>({});

	// Demo NFTs
	const demoNFTs = [
		{ id: '1', name: 'Demo NFT 1', createdAt: Date.now(), content: 'This is the decrypted content for Demo NFT 1' },
		{ id: '2', name: 'Demo NFT 2', createdAt: Date.now() - 86400000, content: 'This is the decrypted content for Demo NFT 2' },
		{ id: '3', name: 'Demo NFT 3', createdAt: Date.now() - 172800000, content: 'This is the decrypted content for Demo NFT 3' },
	];

	const handleDecrypt = async (nftId: string) => {
		if (!currentAccount) {
			toast.error('Wallet not connected', {
				description: 'Please connect your wallet to decrypt NFT content',
			});
			return;
		}

		try {
			setDecryptingId(nftId);
			await new Promise((resolve) => setTimeout(resolve, 1500));
			const nft = demoNFTs.find((n) => n.id === nftId);
			if (nft) {
				setDecryptedContents((prev) => ({
					...prev,
					[nftId]: nft.content,
				}));
				toast.success('Content decrypted successfully');
			}
		} catch (error) {
			toast.error('Failed to decrypt content', {
				description: error instanceof Error ? error.message : 'Unknown error',
			});
		} finally {
			setDecryptingId(null);
		}
	};

	if (!currentAccount) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Your NFTs</CardTitle>
					<CardDescription>Connect your wallet to view your NFTs</CardDescription>
					<CardContent>
						<div className="flex items-center flex-col p-8">
							<Lock className="size-40 text-muted-foreground/80" />
						</div>
					</CardContent>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your NFTs</CardTitle>
				<CardDescription>View and decrypt your NFTs</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{demoNFTs.map((nft) => (
						<Card key={nft.id} className="overflow-hidden">
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">{nft.name}</CardTitle>
								<CardDescription className="text-xs">Created: {new Date(nft.createdAt).toLocaleString()}</CardDescription>
							</CardHeader>
							<CardContent>
								{decryptedContents[nft.id] ? (
									<div className="p-3 bg-muted rounded-md">
										<p className="whitespace-pre-wrap text-sm">{decryptedContents[nft.id]}</p>
									</div>
								) : (
									<p className="text-sm text-muted-foreground">Content is encrypted. Click the button below to decrypt.</p>
								)}
							</CardContent>
							<CardFooter>
								{!decryptedContents[nft.id] && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleDecrypt(nft.id)}
										disabled={isDecrypting || decryptingId === nft.id}
										className="w-full">
										{decryptingId === nft.id ? 'Decrypting...' : 'Decrypt Content'}
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center text-sm text-muted-foreground">
				<a href="https://developer.litprotocol.com/what-is-lit" target="_blank" rel="noopener noreferrer" className="underline">
					Powered by Lit Protocol
				</a>
			</CardFooter>
		</Card>
	);
}
