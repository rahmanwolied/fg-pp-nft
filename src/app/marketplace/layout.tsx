import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "Browse, buy, and sell NFTs",
};

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default async function MarketplaceLayout({
  children,
}: MarketplaceLayoutProps) {
  return (
    <section className="container py-6 space-y-6 md:py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">NFT Marketplace</h1>
        <p className="text-muted-foreground">
          Browse, buy, and sell unique digital assets
        </p>
      </div>
      {children}
    </section>
  );
}
