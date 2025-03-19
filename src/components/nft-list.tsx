"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMintNFT } from "@/hooks/use-mint-nft";
import { useNFTStore, useWalletStore } from "@/lib/store";
import { Lock, Trash } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export function NFTList() {
  const { nfts, removeNFT } = useNFTStore();
  const { currentAccount } = useWalletStore();
  const {
    handleDecrypt,
    isDecrypting,
    decryptingId,
    imageUrl,
    decryptedContent,
  } = useMintNFT();

  if (!currentAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your NFTs</CardTitle>
          <CardDescription>
            Connect your wallet to view your NFTs
          </CardDescription>
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
                <CardDescription className="text-xs">
                  Created: {new Date(nft.createdAt).toLocaleString()}
                </CardDescription>
                <Button
                  onClick={() => removeNFT(nft.id)}
                  className="absolute top-2 right-2"
                >
                  <Trash />
                </Button>
              </CardHeader>
              <CardContent>
                {(() => {
                  const decryptedNFT = decryptedContent?.find(
                    (c) => c.id === nft.id
                  );

                  return decryptingId === nft.id ? (
                    <div className="flex items-center justify-center">
                      <Skeleton className="size-40 rounded-md" />
                    </div>
                  ) : decryptedNFT?.content ? (
                    <Image
                      src={decryptedNFT.content}
                      alt={nft.name}
                      className="w-full h-48 object-contain rounded-md"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Content is encrypted. Click the button below to decrypt.
                      </p>
                      <Lock className="size-40 text-muted-foreground/80" />
                    </div>
                  );
                })()}
                <ScrollArea className="h-48 my-4 rounded-md">
                  <div className="w-full bg-muted rounded-md">
                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words bg-accent rounded-md p-3">
                      <code>{JSON.stringify(nft, null, 2)}</code>
                    </pre>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrypt(nft.id)}
                  disabled={isDecrypting || decryptingId === nft.id}
                  className="w-full"
                >
                  {decryptingId === nft.id
                    ? "Decrypting..."
                    : "Decrypt Content"}
                </Button>
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
  );
}
