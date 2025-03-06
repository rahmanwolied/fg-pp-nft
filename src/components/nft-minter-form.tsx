'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useLitProtocol } from '@/hooks/use-lit-protocol';
import { useIPFS } from '@/hooks/use-ipfs';
import { useStore } from '@/lib/store';

const accessControlConditions = [
	{
		contractAddress: '',
		standardContractType: '',
		chain: 'ethereum',
		method: 'eth_getBalance',
		parameters: [':userAddress', 'latest'],
		returnValueTest: {
			comparator: '>=',
			value: '1000000000000', // 0.000001 ETH
		},
	},
];

const formSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
	content: z.string().min(1, 'Content is required').max(5000, 'Content is too long'),
});

type FormValues = z.infer<typeof formSchema>;

export function NFTMinterForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { encryptContent, isEncrypting, setIsEncrypting } = useLitProtocol();
	const { uploadToIPFS, isUploading, setIsUploading } = useIPFS();
	const { addNFT, currentAccount } = useStore();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			content: '',
		},
	});

	const onSubmit = async (values: FormValues) => {
		if (!currentAccount) {
			toast.error('Wallet not connected', {
				description: 'Please connect your wallet to mint an NFT',
			});
			return;
		}

		setIsSubmitting(true);

		try {
			toast.info('Encrypting content with Lit Protocol...');
			const encrypted = await encryptContent(values.content, accessControlConditions);

			console.log('encrypted', encrypted);

			const metadata = {
				...encrypted,
				name: values.name,
				description: 'Encrypted Text NFT',
				accessControlConditions,
				createdBy: currentAccount,
				createdAt: Date.now(),
			};

			toast.info('Uploading encrypted content to IPFS...');
			const { IpfsHash } = await uploadToIPFS(metadata, `${values.name.replace(/\s+/g, '-')}.json`);

			const newNFT = {
				id: `nft-${Date.now()}`,
				name: values.name,
				content: values.content, // Note: In a real app, you wouldn't store the unencrypted content
				ipfsUrl: `https://ipfs.io/ipfs/${IpfsHash}`,
				owner: currentAccount,
				createdAt: Date.now(),
			};

			addNFT(newNFT);

			// Success notification
			toast.success('NFT created successfully', {
				description: 'Your encrypted content has been stored on IPFS',
			});

			// Reset form
			form.reset();
		} catch (error) {
			toast.error('Failed to create NFT', {
				description: error instanceof Error ? error.message : 'Unknown error',
			});
		} finally {
			setIsSubmitting(false);
			setIsEncrypting(false);
			setIsUploading(false);
		}
	};

	const isProcessing = isSubmitting || isEncrypting || isUploading;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Mint a Text NFT</CardTitle>
				<CardDescription>
					Enter text content to mint as an NFT. Your content will be encrypted using Lit Protocol and stored on IPFS.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>NFT Name</FormLabel>
									<FormControl>
										<Input placeholder="My Secret Text NFT" {...field} />
									</FormControl>
									<FormDescription>Give your NFT a unique name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter the text content you want to encrypt and mint as an NFT..."
											className="min-h-32"
											{...field}
										/>
									</FormControl>
									<FormDescription>This content will be encrypted and only accessible to NFT owners.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isProcessing}>
							{isProcessing ? (isEncrypting ? 'Encrypting...' : isUploading ? 'Uploading to IPFS...' : 'Processing...') : 'Mint NFT'}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center text-sm text-muted-foreground">
				<a
					href="https://developer.litprotocol.com/concepts/access-control-concept"
					target="_blank"
					rel="noopener noreferrer"
					className="underline">
					Learn more about Lit Protocol Access Control
				</a>
			</CardFooter>
		</Card>
	);
}
