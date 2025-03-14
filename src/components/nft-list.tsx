'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useWalletStore, useNFTStore } from '@/lib/store';
import { useLitProtocol } from '@/hooks/use-lit-protocol';
import { Lock, Trash } from 'lucide-react';

const accessControlConditions = [
	{
		contractAddress: '',
		standardContractType: '',
		chain: 'ethereum',
		method: 'eth_getBalance',
		parameters: [':userAddress', 'latest'],
		returnValueTest: {
			comparator: '>=',
			value: '10000', // 0.000001 ETH
		},
	},
];

export function NFTList() {
	const { nfts, removeNFT } = useNFTStore();
	const { currentAccount } = useWalletStore();
	const { isDecrypting, decryptContent, getSessionSigs } = useLitProtocol();
	const [decryptingId, setDecryptingId] = useState<string | null>(null);
	const [decryptedContents, setDecryptedContents] = useState<Record<string, string>>({});

	const handleDecrypt = async (nftId: string) => {
		if (!currentAccount) {
			toast.error('Wallet not connected', {
				description: 'Please connect your wallet to decrypt NFT content',
			});
			return;
		}

		try {
			setDecryptingId(nftId);
			const nft = nfts.find((n) => n.id === nftId);
			if (nft) {
				const sessionSigs = await getSessionSigs(accessControlConditions, nft.encrypted!.dataToEncryptHash);

				if (!sessionSigs) throw new Error('Failed to generate session signature');

				const decrypted = (await decryptContent(nft.encrypted!, sessionSigs)) as string;
				setDecryptedContents((prev) => ({
					...prev,
					[nftId]: decrypted,
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
					{nfts.map((nft) => (
						<Card key={nft.id} className="overflow-hidden">
							<CardHeader className="pb-2 relative">
								<CardTitle className="text-lg">{nft.name}</CardTitle>
								<CardDescription className="text-xs">Created: {new Date(nft.createdAt).toLocaleString()}</CardDescription>
								<Button onClick={() => removeNFT(nft.id)} className="absolute top-2 right-2">
									<Trash />
								</Button>
							</CardHeader>
							<CardContent>
								{decryptedContents[nft.id] ? (
									<div className="p-3 bg-muted rounded-md">
										<p className="whitespace-pre-wrap text-sm">{decryptedContents[nft.id]}</p>
									</div>
								) : (
									<div>
										<div className="flex items-center justify-center">
											<p className="text-sm text-muted-foreground">Content is encrypted. Click the button below to decrypt.</p>
											<Lock className="size-40 text-muted-foreground/80" />
										</div>
										<pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words bg-accent rounded-md p-3">
											<code>{JSON.stringify(nft, null, 2)}</code>
										</pre>
									</div>
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
