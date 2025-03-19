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
import { Form } from "@/components/ui/form";
import { useMintNFT } from "@/hooks/use-mint-nft";
import { NFTMinterFields } from "./nft-minter-fields";

export function NFTMinterForm() {
  const {
    form,
    handleMint: mintNFT,
    isProcessing,
    isEncrypting,
    isUploading,
  } = useMintNFT();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mint an NFT</CardTitle>
        <CardDescription>
          Create an encrypted NFT with text or image content. Your content will
          be encrypted using Lit Protocol and stored on IPFS.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={mintNFT} className="space-y-6">
            <NFTMinterFields form={form} />

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing
                ? isEncrypting
                  ? "Encrypting..."
                  : isUploading
                  ? "Uploading to IPFS..."
                  : "Processing..."
                : "Mint NFT"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <a
          href="https://developer.litprotocol.com/concepts/access-control-concept"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Learn more about Lit Protocol Access Control
        </a>
      </CardFooter>
    </Card>
  );
}
