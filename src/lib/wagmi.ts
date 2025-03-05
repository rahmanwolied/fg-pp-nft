import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

const coreDaoTestnet = defineChain({
	id: 1114,
	name: 'CoreDao Testnet',
	network: 'coredao testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'CoreDao Testnet',
		symbol: 'CT',
	},
	rpcUrls: {
		default: { http: ['https://rpc.test2.btcs.network'] },
	},
	blockExplorers: {
		default: { name: 'CoreDao Testnet Block Explorer', url: 'https://testnet.coredao.com' },
	},
});

// Configure wagmi with the chains and connectors you want to support
export const config = createConfig({
	chains: [mainnet, sepolia, coreDaoTestnet],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[coreDaoTestnet.id]: http(),
	},
	connectors: [injected(), metaMask()],
});
