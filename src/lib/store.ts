import { create } from 'zustand';

type NFT = {
	id: string;
	name: string;
	content: string;
	encrypted?: unknown;
	ipfsUrl: string;
	owner: string;
	createdAt: number;
};

type StoreState = {
	nfts: NFT[];
	addNFT: (nft: NFT) => void;
	isWalletConnected: boolean;
	setWalletConnected: (status: boolean) => void;
	currentAccount: string | null;
	setCurrentAccount: (account: string | null) => void;
};

export const useStore = create<StoreState>((set) => ({
	nfts: [],
	addNFT: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
	isWalletConnected: false,
	setWalletConnected: (status) => set({ isWalletConnected: status }),
	currentAccount: null,
	setCurrentAccount: (account) => set({ currentAccount: account }),
}));
