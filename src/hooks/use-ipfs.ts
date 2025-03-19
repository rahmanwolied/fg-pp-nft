"use client";

import { getData, uploadJson, uploadText } from "@/lib/pinata";
import { UploadResponse } from "pinata";
import { useState } from "react";

export function useIPFS() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload data to IPFS
  const uploadToIPFS = async (
    content: string | object,
    filename = "encrypted-nft.txt"
  ) => {
    setIsUploading(true);
    setError(null);

    try {
      let res: UploadResponse;

      if (typeof content === "string") {
        res = await uploadText(content, filename);
      } else {
        res = await uploadJson(content, filename);
      }

      setIsUploading(false);
      return res;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error during IPFS upload";
      setError(errorMessage);
      setIsUploading(false);
      throw err;
    }
  };

  const fetchFromIPFS = async (cid: string) => {
    const data = await getData(cid);
    return data;
  };

  return {
    uploadToIPFS,
    fetchFromIPFS,
    setIsUploading,
    isUploading,
    error,
  };
}
