"use client";

import { FilterSidebar } from "@/components/marketplace/filter-sidebar";
import { NFTCardProps } from "@/components/marketplace/nft-card";
import { NFTGrid } from "@/components/marketplace/nft-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketplaceFilterValues } from "@/lib/schemas/marketplace-schema";
import { useWalletStore } from "@/lib/store";
import { InfoIcon, PlusCircle, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for demonstration purposes
const mockNFTs: NFTCardProps[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `nft-${i}`,
  name: `${
    ["Cosmic", "Digital", "Crypto", "Pixel", "Abstract"][
      Math.floor(Math.random() * 5)
    ]
  } ${
    ["Art", "Creation", "Collectible", "Asset", "Token"][
      Math.floor(Math.random() * 5)
    ]
  } #${i + 1}`,
  description: `A unique digital asset showcasing creativity and blockchain innovation. This is a one-of-a-kind NFT with special attributes.`,
  image: `https://source.unsplash.com/random/300x300?nft&sig=${i}`,
  price: parseFloat((0.1 + Math.random() * 2).toFixed(3)),
  owner: `0x${Math.random().toString(16).substring(2, 42)}`,
  creator: `0x${Math.random().toString(16).substring(2, 42)}`,
  isVerified: Math.random() > 0.5,
  likes: Math.floor(Math.random() * 100),
  createdAt: Date.now() - Math.floor(Math.random() * 10000000000),
}));

export default function MarketplacePage() {
  const { currentAccount } = useWalletStore();
  const [currentTab, setCurrentTab] = useState<"all" | "trending" | "new">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<MarketplaceFilterValues>({
    search: "",
    sortBy: "newest",
    category: "all",
    priceRange: { min: 0, max: 1000 },
    onlyVerified: false,
  });

  const handleBuy = async (id: string) => {
    if (!currentAccount) {
      toast.error("Please connect your wallet to buy NFTs");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(`Successfully purchased NFT ${id}`, {
        description: "The NFT has been transferred to your wallet",
      });
    } catch (error) {
      toast.error("Failed to purchase NFT", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id: string) => {
    // In a real app, this would navigate to the NFT detail page
    console.log(`View NFT ${id}`);
  };

  // Filter NFTs based on current tab
  const displayedNFTs = mockNFTs.filter((nft) => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    if (currentTab === "trending") {
      return (nft.likes ?? 0) > 50; // Use nullish coalescing to provide default value
    } else if (currentTab === "new") {
      return nft.createdAt > oneWeekAgo;
    }

    return true; // "all" tab shows everything
  });

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center gap-4">
          <Tabs
            value={currentTab}
            onValueChange={(value) => setCurrentTab(value as typeof currentTab)}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="all">All NFTs</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            asChild
          >
            <Link href="/marketplace/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create
            </Link>
          </Button>
        </div>
        {!currentAccount && (
          <div className="flex items-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-50">
            <InfoIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              Connect your wallet to buy or sell NFTs
            </span>
            <Button variant="link" size="sm" className="ml-2 h-auto p-0">
              <Wallet className="mr-1 h-4 w-4" />
              Connect
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 lg:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link href="/marketplace/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="hidden lg:block">
          <FilterSidebar onFilterChange={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <NFTGrid
            nfts={displayedNFTs}
            filters={filters}
            onBuy={handleBuy}
            onView={handleView}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
