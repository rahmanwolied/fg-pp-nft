import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * Hardhat Ignition module for deploying the PrivacyNFT contract
 * 
 * This module deploys the PrivacyNFT contract, which is an ERC721 token with
 * privacy features for encrypted content. The contract supports storing encrypted
 * content metadata on-chain and provides mechanisms for managing access to the
 * encrypted content based on token approvals.
 */
export default buildModule("PrivacyNFT", (m) => {
  // Deploy the PrivacyNFT contract with no constructor arguments
  const privacyNFT = m.contract("PrivacyNFT");
  
  return {
    privacyNFT,
  };
}); 