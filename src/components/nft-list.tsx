'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useStore } from '@/lib/store'
import { useLitProtocol } from '@/hooks/useLitProtocol'

export function NFTList() {
  const { nfts, currentAccount } = useStore()
  const { decryptContent, isDecrypting } = useLitProtocol()
  const [decryptingId, setDecryptingId] = useState<string | null>(null)
  const [decryptedContents, setDecryptedContents] = useState<Record<string, string>>({})

  const handleDecrypt = async (nftId: string, encryptedContent: string) => {
    if (!currentAccount) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to decrypt NFT content',
      })
      return
    }

    try {
      setDecryptingId(nftId)

      // In a real application, you would fetch the encrypted symmetric key and access control conditions from IPFS or your backend
      // For this prototype, we're using the content directly from our local state
      // This is just a simulation - in a real app you would:
      // 1. Fetch the metadata from IPFS using the ipfsUrl
      // 2. Extract the encryptedSymmetricKey and accessControlConditions
      // 3. Use those to decrypt the content
      
      // Simulate decryption delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For the prototype, we're just showing the content we already have in state
      // In a real app, this would be the actual decrypted content
      const nft = nfts.find(n => n.id === nftId)
      if (nft) {
        setDecryptedContents(prev => ({
          ...prev,
          [nftId]: nft.content
        }))
        
        toast.success('Content decrypted successfully')
      }
    } catch (error) {
      toast.error('Failed to decrypt content', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setDecryptingId(null)
    }
  }

  if (!currentAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your NFTs</CardTitle>
          <CardDescription>
            Connect your wallet to view your NFTs
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (nfts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your NFTs</CardTitle>
          <CardDescription>
            You don't have any NFTs yet. Mint your first NFT to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your NFTs</CardTitle>
        <CardDescription>
          View and decrypt your NFTs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nfts.map((nft) => (
            <Card key={nft.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{nft.name}</CardTitle>
                <CardDescription className="text-xs">
                  Created: {new Date(nft.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {decryptedContents[nft.id] ? (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap text-sm">{decryptedContents[nft.id]}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Content is encrypted. Click the button below to decrypt.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                {!decryptedContents[nft.id] && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDecrypt(nft.id, nft.encryptedContent)}
                    disabled={isDecrypting || decryptingId === nft.id}
                    className="w-full"
                  >
                    {decryptingId === nft.id ? 'Decrypting...' : 'Decrypt Content'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <a
          href="https://developer.litprotocol.com/what-is-lit"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Powered by Lit Protocol
        </a>
      </CardFooter>
    </Card>
  )
}
