import { WalletConnect } from '@/components/wallet-connect'
import { NFTMinterForm } from '@/components/nft-minter-form'
import { NFTList } from '@/components/nft-list'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Text NFT Minter</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Create encrypted text NFTs using Lit Protocol and store them on IPFS
      </p>
      
      {/* Wallet Connection */}
      <div className="mb-8">
        <WalletConnect />
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
      
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Built with Next.js, Lit Protocol, and IPFS.
          <a 
            href="https://developer.litprotocol.com/what-is-lit"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            Learn more about Lit Protocol
          </a>
        </p>
      </div>
    </div>
  );
}
