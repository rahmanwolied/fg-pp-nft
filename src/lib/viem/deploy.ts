import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
  parseEther,
  zeroAddress,
} from "viem";
import { sepolia } from "viem/chains";
import { FAME_ADDRESS } from "./adresses";
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
    args: [
      args.name,
      args.symbol,
      args.baseURI,
      args.defaultRoyaltyFee,
      FAME_ADDRESS,
    ],
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
    await contractInstance.simulate.mintDigitalNft(
      [parseEther("0.0001"), args.tokenURI, BigInt(500), zeroAddress],
      {
        account,
        value: parseEther("0.00001"),
      }
    );
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
