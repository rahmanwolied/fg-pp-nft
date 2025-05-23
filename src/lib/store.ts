import {
  AccessControlConditions,
  EncryptToJsonPayload,
} from "@lit-protocol/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type NFT = {
  id: string;
  name: string;
  description: string;
  contentType: "text" | "image";
  metadataHash: string;
  price: number;
  royalty: number;
  likes: number;
  owner: string;
  creator: string;
  isVerified: boolean;
  createdAt: number;
  image?: string;
  encryptedKeys: EncryptToJsonPayload;
  encryptedContent: string;
  encrypted: boolean;
  accessControlConditions: AccessControlConditions;
};

type NFTStoreState = {
  nfts: NFT[];
  addNFT: (nft: NFT) => void;
  removeNFT: (id: string) => void;
};

type WalletStoreState = {
  isWalletConnected: boolean;
  setWalletConnected: (status: boolean) => void;
  currentAccount: string | null;
  setCurrentAccount: (account: string | null) => void;
};

export const useNFTStore = create(
  persist<NFTStoreState>(
    (set) => ({
      nfts: [],
      addNFT: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
      removeNFT: (id: string) =>
        set((state) => ({ nfts: state.nfts.filter((n) => n.id !== id) })),
    }),
    {
      name: "nft-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);

export const useWalletStore = create<WalletStoreState>((set) => ({
  isWalletConnected: false,
  setWalletConnected: (status) => set({ isWalletConnected: status }),
  currentAccount: null,
  setCurrentAccount: (account) => set({ currentAccount: account }),
}));
