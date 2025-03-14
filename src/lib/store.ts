import { EncryptToJsonPayload } from '@lit-protocol/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type NFT = {
	id: string;
	name: string;
	content: string;
	ipfsUrl: string;
	owner: string;
	createdAt: number;
	encrypted?: EncryptToJsonPayload;
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

// Demo NFTs
const demoNFTs = [
	{
		id: '1',
		name: 'Demo NFT 1',
		createdAt: Date.now(),
		content: 'This is the decrypted content for Demo NFT 1',
		ipfsUrl: '',
		owner: '',
	},
];

export const useNFTStore = create(
	persist<NFTStoreState>(
		(set) => ({
			nfts: demoNFTs,
			addNFT: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
			removeNFT: (id: string) => set((state) => ({ nfts: state.nfts.filter((n) => n.id !== id) })),
		}),
		{
			name: 'nft-storage',
			storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
		}
	)
);

export const useWalletStore = create<WalletStoreState>((set) => ({
	isWalletConnected: false,
	setWalletConnected: (status) => set({ isWalletConnected: status }),
	currentAccount: null,
	setCurrentAccount: (account) => set({ currentAccount: account }),
}));
