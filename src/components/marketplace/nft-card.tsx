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
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletStore } from "@/lib/store";
import { CheckCircle2, Eye, Heart, History, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface NFTCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  owner: string;
  creator: string;
  isVerified?: boolean;
  likes?: number;
  createdAt: number;
  onBuy?: (id: string) => void;
  onView?: (id: string) => void;
}

export function NFTCard({
  id,
  name,
  description,
  image,
  price,
  owner,
  creator,
  isVerified = false,
  likes = 0,
  createdAt,
  onBuy,
  onView,
}: NFTCardProps) {
  const { currentAccount } = useWalletStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const isOwner =
    currentAccount && currentAccount.toLowerCase() === owner.toLowerCase();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md py-0">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all hover:scale-105"
          onLoad={() => setIsImageLoading(false)}
          style={{ display: isImageLoading ? "none" : "block" }}
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => onView?.(id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="flex items-center text-lg font-semibold">
          {name}
          {isVerified && (
            <CheckCircle2 className="ml-1 h-4 w-4 text-blue-500" />
          )}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Owner</p>
            <p className="font-medium">{formatAddress(owner)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-bold text-primary">{price} ETH</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t py-4">
        <div className="flex items-center self-start justify-between w-full space-x-2 text-xs text-muted-foreground">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-1">
              <History className="h-3.5 w-3.5" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{likeCount}</span>
            </div>
          </div>
          {!isOwner ? (
            <Button
              size="sm"
              onClick={() => onBuy?.(id)}
              className="space-x-1"
              disabled={!currentAccount}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              <span>Buy Now</span>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="space-x-1">
              <span>Owned</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
