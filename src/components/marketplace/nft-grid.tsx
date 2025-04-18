"use client";

import { NFTCard, NFTCardProps } from "@/components/marketplace/nft-card";
import { MarketplaceFilterValues } from "@/lib/schemas/marketplace-schema";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

interface NFTGridProps {
  nfts: NFTCardProps[];
  filters: MarketplaceFilterValues;
  onBuy?: (id: string) => void;
  onView?: (id: string) => void;
  isLoading?: boolean;
}

export function NFTGrid({
  nfts,
  filters,
  onBuy,
  onView,
  isLoading = false,
}: NFTGridProps) {
  const filteredNFTs = useMemo(() => {
    if (isLoading) {
      return [];
    }

    let filtered = [...nfts];

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchTerm) ||
          nft.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (filters.category !== "all") {
      // In a real app, NFTs would have categories
      // This is a simplified example
    }

    // Filter by price range
    filtered = filtered.filter(
      (nft) =>
        nft.price >= filters.priceRange.min &&
        nft.price <= filters.priceRange.max
    );

    // Filter by verification status
    if (filters.onlyVerified) {
      filtered = filtered.filter((nft) => nft.isVerified);
    }

    // Sort based on criteria
    switch (filters.sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        filtered = filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "name_asc":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price_asc":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [nfts, filters, isLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <NFTCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredNFTs.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mt-4 text-lg font-semibold">No NFTs found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredNFTs.map((nft) => (
        <NFTCard key={nft.id} {...nft} onBuy={onBuy} onView={onView} />
      ))}
    </div>
  );
}

function NFTCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Skeleton className="aspect-square bg-muted"></Skeleton>
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 rounded bg-muted"></Skeleton>
        <Skeleton className="h-3 w-full rounded bg-muted"></Skeleton>
        <div className="flex justify-between pt-3">
          <div className="space-y-1">
            <Skeleton className="h-2 w-16 rounded bg-muted"></Skeleton>
            <Skeleton className="h-3 w-24 rounded bg-muted"></Skeleton>
          </div>
          <div className="space-y-1">
            <Skeleton className="h-2 w-12 rounded bg-muted"></Skeleton>
            <Skeleton className="h-3 w-16 rounded bg-muted"></Skeleton>
          </div>
        </div>
      </div>
      <div className="border-t p-4 flex justify-between">
        <Skeleton className="h-3 w-20 rounded bg-muted"></Skeleton>
        <Skeleton className="h-8 w-20 rounded bg-muted"></Skeleton>
      </div>
    </div>
  );
}
