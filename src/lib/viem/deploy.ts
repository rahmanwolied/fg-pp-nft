import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
} from "viem";
import { sepolia } from "viem/chains";
import { artifacts } from "./artifacts";

const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// JSON-RPC Account
const [account] = await walletClient.getAddresses();

export const deployContract = async (args: NFTContractConstructorArgs) => {
  await walletClient.switchChain({ id: sepolia.id });

  const hash = await walletClient.deployContract({
    abi: artifacts.abi,
    account,
    bytecode: artifacts.bytecode as `0x${string}`,
    args: [args.name, args.symbol],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  return receipt.contractAddress as `0x${string}`;
};

export const mintNft = async (args: MintNftArgs) => {
  await walletClient.switchChain({ id: sepolia.id });

  const contractInstance = getContract({
    abi: artifacts.abi,
    address: args.contractAddress,
    client: { public: publicClient, wallet: walletClient },
  });

  const { result: tokenId, request: mintRequest } =
    await contractInstance.simulate.mintNFT([account, args.tokenURI], {
      account,
    });
  const hash = await walletClient.writeContract(mintRequest);
  await publicClient.waitForTransactionReceipt({ hash });

  return tokenId;
};

export const deployAndMintNFT = async (args: NFTContractConstructorArgs) => {
  const contractAddress = await deployContract(args);
  const tokenId = await mintNft({
    contractAddress,
    tokenURI: args.baseURI,
  });
  return { contractAddress, tokenId };
};

export type NFTContractConstructorArgs = {
  name: string;
  symbol: string;
  baseURI: string;
  defaultRoyaltyFee: bigint;
  fameAddress: `0x${string}`;
};

export type MintNftArgs = {
  contractAddress: Address;
  tokenURI: string;
};
