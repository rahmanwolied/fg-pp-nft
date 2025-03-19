"use client";

import { useIPFS } from "@/hooks/use-ipfs";
import { useLitProtocol } from "@/hooks/use-lit-protocol";
import {
  displayDecryptedImage,
  EncryptedData,
  encryptFileInBrowser,
  EncryptionKeys,
  encryptText,
} from "@/lib/crypto";
import { generateSessionSignature } from "@/lib/lit";
import { compress, decompress } from "@/lib/pako";
import {
  nftMinterFormSchema,
  type NFTMinterFormValues,
} from "@/lib/schemas/nft-minter-schema";
import { useNFTStore, useWalletStore } from "@/lib/store";
import { deployAndMintNFT } from "@/lib/viem/deploy";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessControlConditions } from "@lit-protocol/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type DecryptedContent = {
  id: string;
  content: string;
}[];

export function useMintNFT() {
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [decryptedContent, setDecryptedContent] =
    useState<DecryptedContent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { nfts } = useNFTStore();
  const { isDecrypting, decryptContent, getSessionSigs } = useLitProtocol();
  const { addNFT } = useNFTStore();
  const { currentAccount } = useWalletStore();
  const {
    encryptContent: encryptContentWithLit,
    isEncrypting,
    setIsEncrypting,
  } = useLitProtocol();
  const { uploadToIPFS, isUploading, setIsUploading, fetchFromIPFS } =
    useIPFS();

  const form = useForm<NFTMinterFormValues>({
    resolver: zodResolver(nftMinterFormSchema),
    defaultValues: {
      name: "",
      contentType: "text",
      content: "",
    },
  });

  const isProcessing = isSubmitting || isEncrypting || isUploading;

  const handleMint = form.handleSubmit(async (values) => {
    if (!currentAccount) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to mint an NFT",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let encryptionKeys: string;
      let encryptedContent: EncryptedData;

      toast.info("Encrypting content on your browser...");
      if (values.contentType === "image" && values.content instanceof File) {
        // Encrypt the image file
        encryptedContent = await encryptFileInBrowser(values.content);

        encryptionKeys = JSON.stringify({
          authTag: encryptedContent.authTag,
          iv: encryptedContent.iv,
          salt: encryptedContent.salt,
          key: encryptedContent.key,
        });
      } else {
        encryptedContent = encryptText(values.content as string);

        encryptionKeys = JSON.stringify({
          authTag: encryptedContent.authTag,
          iv: encryptedContent.iv,
          salt: encryptedContent.salt,
          key: encryptedContent.key,
        });
      }

      toast.info("Uploading encrypted content to IPFS...");
      const { cid: encryptedContentIpfsHash } = await uploadToIPFS(
        compress(encryptedContent.encryptedContent),
        `${values.name.replace(/\s+/g, "-")}.txt`
      );

      toast.info("Minting NFT...");
      const { contractAddress, tokenId } = await deployAndMintNFT({
        name: values.name,
        symbol: "TST",
        baseURI: encryptedContentIpfsHash,
        defaultRoyaltyFee: BigInt(0),
        fameAddress: currentAccount as `0x${string}`,
      });

      console.log("tokenId", tokenId);

      const accessControlConditions: AccessControlConditions = [
        {
          contractAddress,
          standardContractType: "ERC721",
          chain: "sepolia",
          method: "getApproved",
          parameters: [tokenId.toString()],
          returnValueTest: {
            comparator: "=",
            value: ":userAddress",
          },
        },
        {
          operator: "or",
        },
        {
          contractAddress,
          standardContractType: "ERC721",
          chain: "sepolia",
          method: "ownerOf",
          parameters: [tokenId.toString()],
          returnValueTest: {
            comparator: "=",
            value: ":userAddress",
          },
        },
      ];

      toast.info("Encrypting the key with Lit Protocol...");
      const encryptedKeys = await encryptContentWithLit(
        encryptionKeys,
        accessControlConditions
      );

      const metadata = {
        id: crypto.randomUUID(),
        encryptedKeys,
        encryptedContent: encryptedContentIpfsHash,
        description: `Encrypted ${values.contentType} NFT`,
        name: values.name,
        contentType: values.contentType,
        accessControlConditions,
        createdBy: currentAccount,
        createdAt: Date.now(),
      };

      toast.info("Uploading encrypted metadata to IPFS...");
      const { cid: metadataIpfsHash } = await uploadToIPFS(
        metadata,
        `${values.name.replace(/\s+/g, "-")}.json`
      );

      addNFT({
        ...metadata,
        metadataIpfsHash,
      });

      toast.success("NFT created successfully", {
        description: "Your encrypted content has been stored on IPFS",
      });

      form.reset();
    } catch (error) {
      console.error("Error creating NFT", error);
      toast.error("Failed to create NFT", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
      setIsEncrypting(false);
      setIsUploading(false);
    }
  });

  const handleDecrypt = async (nftId: string) => {
    setDecryptingId(nftId);

    if (!currentAccount) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to decrypt NFT content",
      });
      return;
    }

    const nft = nfts.find((n) => n.id === nftId);
    if (!nft?.encryptedContent) {
      toast.error("No encrypted content found");
      return;
    }

    try {
      const sessionSigs = await generateSessionSignature(
        nft.accessControlConditions,
        nft.encryptedKeys.dataToEncryptHash
      );

      if (!sessionSigs) {
        throw new Error("Failed to generate session signature");
      }

      const decryptedKeys = JSON.parse(
        (await decryptContent(nft.encryptedKeys, sessionSigs)) as string
      ) as EncryptionKeys;

      const { data } = await fetchFromIPFS(nft.encryptedContent);

      let encryptedContent: string;

      if (!data) {
        throw new Error("Data not found");
      }

      if (typeof data === "string") {
        encryptedContent = decompress(data);
      } else {
        encryptedContent = decompress((data as any).content);
      }

      console.log("encryptedContent", encryptedContent);

      if (!encryptedContent) {
        throw new Error("Invalid encrypted content structure");
      }

      const decryptedContent = await displayDecryptedImage({
        ...decryptedKeys,
        encryptedContent,
      });

      setImageUrl(decryptedContent);
      setDecryptedContent((prev) => [
        ...(prev || []),
        {
          id: nftId,
          content: decryptedContent,
        },
      ]);

      toast.success("Content decrypted successfully");
    } catch (error: any) {
      console.error("Error decrypting content", error);
      toast.error("Failed to decrypt content", {
        description: error.info.message ?? "Unknown error",
      });
    } finally {
      setDecryptingId(null);
    }
  };

  return {
    form,
    handleMint,
    isProcessing,
    isEncrypting,
    isUploading,
    handleDecrypt,
    isDecrypting,
    decryptingId,
    imageUrl,
    decryptedContent,
  };
}
