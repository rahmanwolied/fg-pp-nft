"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useWalletStore } from "@/lib/store";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CreateNFTForm from "./components/create-nft-form";

export default function CreateNFTPage() {
  const { currentAccount } = useWalletStore();

  if (!currentAccount) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>
            You need to connect your wallet to create an NFT
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex flex-col items-center space-y-4 p-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Please connect your wallet to create and sell NFTs
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New NFT</CardTitle>
          <CardDescription>
            Fill in the details to create and list your NFT on the marketplace
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
          <CreateNFTForm />
        </CardContent>
      </Card>
    </div>
  );
}
