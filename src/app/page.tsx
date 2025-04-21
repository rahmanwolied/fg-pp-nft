import { NFTMinterForm } from '@/components/nft-minter-form';
import { NFTList } from '@/components/nft-list';

export default function Home() {
	return (
		<div className="mx-auto px-4 py-8">
			<div className="">
				<h1 className="text-5xl font-bold mb-4 text-left">Protect Your Data</h1>
				<p className="text-left mb-8 text-muted-foreground">Create encrypted NFTs using Lit Protocol and store them on IPFS</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* NFT Minter Form */}
				<div>
					<NFTMinterForm />
				</div>

				{/* NFT List */}
				<div>
					<NFTList />
				</div>
			</div>
		</div>
	);
}