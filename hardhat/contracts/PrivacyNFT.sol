// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PrivacyNFT
 * @dev ERC721 token with privacy features for encrypted content
 * 
 * This contract extends the standard ERC721 to support encrypted content with
 * access control based on token approvals. It stores encrypted content metadata
 * on-chain and provides mechanisms for managing access to the encrypted content.
 */
contract PrivacyNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIds;
    
    // Struct to store encrypted content metadata
    struct EncryptedContent {
        string encryptedContentURI;      // URI to the encrypted content (IPFS, Arweave, etc.)
        string encryptedSymmetricKey;    // Encrypted symmetric key (encrypted by Lit Protocol)
        string encryptionMetadata;       // Additional metadata for decryption (JSON string)
        bool isEncrypted;                // Flag to indicate if the content is encrypted
    }
    
    // Mapping from token ID to encrypted content metadata
    mapping(uint256 => EncryptedContent) private _encryptedContents;
    
    // Events
    event ContentEncrypted(uint256 indexed tokenId, string encryptedContentURI);
    event ContentDecryptionRequested(uint256 indexed tokenId, address indexed requester);
    
    constructor() ERC721("PrivacyNFT", "PNFT") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new NFT with encrypted content
     * @param to The address that will own the minted token
     * @param tokenURI The token URI for standard metadata
     * @param encryptedContentURI URI to the encrypted content
     * @param encryptedSymmetricKey The encrypted symmetric key
     * @param encryptionMetadata Additional metadata for decryption
     * @return The ID of the newly minted token
     */
    function mintWithEncryptedContent(
        address to,
        string memory tokenURI,
        string memory encryptedContentURI,
        string memory encryptedSymmetricKey,
        string memory encryptionMetadata
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        _encryptedContents[newTokenId] = EncryptedContent({
            encryptedContentURI: encryptedContentURI,
            encryptedSymmetricKey: encryptedSymmetricKey,
            encryptionMetadata: encryptionMetadata,
            isEncrypted: true
        });
        
        emit ContentEncrypted(newTokenId, encryptedContentURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Mint a new NFT without encrypted content
     * @param to The address that will own the minted token
     * @param tokenURI The token URI for standard metadata
     * @return The ID of the newly minted token
     */
    function mint(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Add encrypted content to an existing token
     * @param tokenId The ID of the token to add encrypted content to
     * @param encryptedContentURI URI to the encrypted content
     * @param encryptedSymmetricKey The encrypted symmetric key
     * @param encryptionMetadata Additional metadata for decryption
     */
    function addEncryptedContent(
        uint256 tokenId,
        string memory encryptedContentURI,
        string memory encryptedSymmetricKey,
        string memory encryptionMetadata
    ) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender || getApproved(tokenId) == msg.sender, "Not token owner or approved");
        
        _encryptedContents[tokenId] = EncryptedContent({
            encryptedContentURI: encryptedContentURI,
            encryptedSymmetricKey: encryptedSymmetricKey,
            encryptionMetadata: encryptionMetadata,
            isEncrypted: true
        });
        
        emit ContentEncrypted(tokenId, encryptedContentURI);
    }
    
    /**
     * @dev Get encrypted content metadata for a token
     * @param tokenId The ID of the token to get encrypted content for
     * @return The encrypted content metadata
     */
    function getEncryptedContent(uint256 tokenId) public view returns (
        string memory encryptedContentURI,
        string memory encryptedSymmetricKey,
        string memory encryptionMetadata,
        bool isEncrypted
    ) {
        require(_exists(tokenId), "Token does not exist");
        
        // Check if caller is owner, approved, or approved for all
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(owner, msg.sender),
            "Not authorized to access encrypted content"
        );
        
        EncryptedContent memory content = _encryptedContents[tokenId];
        
        return (
            content.encryptedContentURI,
            content.encryptedSymmetricKey,
            content.encryptionMetadata,
            content.isEncrypted
        );
    }
    
    /**
     * @dev Check if a token has encrypted content
     * @param tokenId The ID of the token to check
     * @return True if the token has encrypted content, false otherwise
     */
    function hasEncryptedContent(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return _encryptedContents[tokenId].isEncrypted;
    }
    
    /**
     * @dev Request decryption of a token's content
     * This function is called when a user wants to decrypt content
     * It emits an event that can be used by off-chain services to handle decryption
     * @param tokenId The ID of the token to decrypt
     */
    function requestContentDecryption(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(_encryptedContents[tokenId].isEncrypted, "Token does not have encrypted content");
        
        // Check if caller is owner, approved, or approved for all
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(owner, msg.sender),
            "Not authorized to decrypt content"
        );
        
        emit ContentDecryptionRequested(tokenId, msg.sender);
    }
    
    /**
     * @dev Update the encrypted content metadata for a token
     * @param tokenId The ID of the token to update
     * @param encryptedContentURI New URI to the encrypted content
     * @param encryptedSymmetricKey New encrypted symmetric key
     * @param encryptionMetadata New additional metadata for decryption
     */
    function updateEncryptedContent(
        uint256 tokenId,
        string memory encryptedContentURI,
        string memory encryptedSymmetricKey,
        string memory encryptionMetadata
    ) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        
        _encryptedContents[tokenId] = EncryptedContent({
            encryptedContentURI: encryptedContentURI,
            encryptedSymmetricKey: encryptedSymmetricKey,
            encryptionMetadata: encryptionMetadata,
            isEncrypted: true
        });
        
        emit ContentEncrypted(tokenId, encryptedContentURI);
    }
    
    /**
     * @dev Remove encrypted content from a token
     * @param tokenId The ID of the token to remove encrypted content from
     */
    function removeEncryptedContent(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        
        delete _encryptedContents[tokenId];
    }
    
    // Override required functions due to multiple inheritance
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
    
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 