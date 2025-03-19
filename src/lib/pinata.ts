"use server";

import { PINATA_CONFIG } from "@/lib/env";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: PINATA_CONFIG.PINATA_JWT || "",
  pinataGateway: PINATA_CONFIG.PINATA_GATEWAY || "",
  pinataGatewayKey: PINATA_CONFIG.PINATA_GATEWAY_KEY || "",
});

export const uploadText = async (
  content: string,
  filename = "encrypted-nft.txt"
) => {
  try {
    const file = new File([content], filename, { type: "text/plain" });
    const upload = await pinata.upload.public.file(file).name(filename);
    return upload;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error during IPFS upload";
    throw new Error(errorMessage);
  }
};

export const uploadJson = async (
  content: object,
  filename = "encrypted-nft.json"
) => {
  try {
    const upload = await pinata.upload.public.json(content).name(filename);
    return upload;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error during IPFS upload";
    throw new Error(errorMessage);
  }
};

export const getData = async (cid: string) => {
  try {
    const url = await pinata.gateways.public.convert(cid);
    console.log("url", url);
    const data = await pinata.gateways.public.get(cid);
    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error fetching from IPFS";
    throw new Error(errorMessage);
  }
};
