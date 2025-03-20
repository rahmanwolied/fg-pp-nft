export const artifacts = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string",
        },
        {
          internalType: "string",
          name: "_baseURI",
          type: "string",
        },
        {
          internalType: "uint96",
          name: "_defaultRoyaltyFee",
          type: "uint96",
        },
        {
          internalType: "address",
          name: "_fameAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "numerator",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "denominator",
          type: "uint256",
        },
      ],
      name: "ERC2981InvalidDefaultRoyalty",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC2981InvalidDefaultRoyaltyReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "numerator",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "denominator",
          type: "uint256",
        },
      ],
      name: "ERC2981InvalidTokenRoyalty",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC2981InvalidTokenRoyaltyReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721NonexistentToken",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "SafeERC20FailedOperation",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "newBaseURI",
          type: "string",
        },
      ],
      name: "BaseURIUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_toTokenId",
          type: "uint256",
        },
      ],
      name: "BatchMetadataUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint96",
          name: "newFee",
          type: "uint96",
        },
      ],
      name: "DefaultRoyaltyFeeUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "assetOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Earned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "MetadataUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "NFTMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "paymentToken",
          type: "address",
        },
      ],
      name: "PaymentTokenSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "PriceSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint96",
          name: "royaltyFee",
          type: "uint96",
        },
      ],
      name: "TokenRoyaltyFeeUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "CREATED_PLATFORM_NAME",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "fameAddress",
      outputs: [
        {
          internalType: "contract IFameToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
        {
          internalType: "uint96",
          name: "tokenRoyaltyFee",
          type: "uint96",
        },
        {
          internalType: "address",
          name: "paymentToken",
          type: "address",
        },
      ],
      name: "mintDigitalNft",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "platformAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "platformFeeAddress",
      outputs: [
        {
          internalType: "contract IPlatformFee",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "salePrice",
          type: "uint256",
        },
      ],
      name: "royaltyInfo",
      outputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newBaseURI",
          type: "string",
        },
      ],
      name: "setBaseURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint96",
          name: "newDefaultRoyaltyPercentage",
          type: "uint96",
        },
      ],
      name: "setDefaultRoyaltyFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_paymentToken",
          type: "address",
        },
      ],
      name: "setPriceAndPaymentToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint96",
          name: "royaltyFee",
          type: "uint96",
        },
      ],
      name: "setTokenRoyalty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tokenData",
      outputs: [
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "paymentToken",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ] as const,
  bytecode:
    "60a060405234801562000010575f80fd5b5060405162002dd338038062002dd3833981016040819052620000339162000422565b3385855f6200004383826200056a565b5060016200005282826200056a565b50506009805460ff19169055506001600160a01b0381166200008e57604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b6200009981620000dc565b506001600a55600e620000ad84826200056a565b50620000ba338362000135565b6001600160a01b038116608052620000d1620001db565b505050505062000659565b600980546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b6127106001600160601b0382168110156200017657604051636f483d0960e01b81526001600160601b03831660048201526024810182905260440162000085565b6001600160a01b038316620001a157604051635b6cc80560e11b81525f600482015260240162000085565b50604080518082019091526001600160a01b039092168083526001600160601b039091166020909201829052600160a01b90910217600755565b620001e5620002fb565b5f6080516001600160a01b031663f5aac5e16040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000225573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906200024b919062000636565b905080600c5f6101000a8154816001600160a01b0302191690836001600160a01b031602179055506080516001600160a01b031663ee99205c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620002b2573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190620002d8919062000636565b600d80546001600160a01b0319166001600160a01b039290921691909117905550565b60095460ff1615620003435760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640162000085565b565b634e487b7160e01b5f52604160045260245ffd5b5f82601f83011262000369575f80fd5b81516001600160401b038082111562000386576200038662000345565b604051601f8301601f19908116603f01168101908282118183101715620003b157620003b162000345565b8160405283815260209250866020858801011115620003ce575f80fd5b5f91505b83821015620003f15785820183015181830184015290820190620003d2565b5f602085830101528094505050505092915050565b80516001600160a01b03811681146200041d575f80fd5b919050565b5f805f805f60a0868803121562000437575f80fd5b85516001600160401b03808211156200044e575f80fd5b6200045c89838a0162000359565b9650602088015191508082111562000472575f80fd5b6200048089838a0162000359565b9550604088015191508082111562000496575f80fd5b50620004a58882890162000359565b606088015190945090506001600160601b0381168114620004c4575f80fd5b9150620004d46080870162000406565b90509295509295909350565b600181811c90821680620004f557607f821691505b6020821081036200051457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200056557805f5260205f20601f840160051c81016020851015620005415750805b601f840160051c820191505b8181101562000562575f81556001016200054d565b50505b505050565b81516001600160401b0381111562000586576200058662000345565b6200059e81620005978454620004e0565b846200051a565b602080601f831160018114620005d4575f8415620005bc5750858301515b5f19600386901b1c1916600185901b1785556200062e565b5f85815260208120601f198616915b828110156200060457888601518255948401946001909101908401620005e3565b50858210156200062257878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b5f6020828403121562000647575f80fd5b620006528262000406565b9392505050565b608051612753620006805f395f81816103b301528181611c2d0152611cd501526127535ff3fe6080604052600436106101db575f3560e01c806367a4f4a9116100fd578063b4b5b48f11610092578063e985e9c511610062578063e985e9c51461058f578063eb7ebb86146105ae578063ed14834f146105f6578063f2fde38b14610615575f80fd5b8063b4b5b48f146104da578063b88d4fde14610532578063c87b56dd14610551578063dbe55e5614610570575f80fd5b80638456cb59116100cd5780638456cb59146104715780638da5cb5b1461048557806395d89b41146104a7578063a22cb465146104bb575f80fd5b806367a4f4a91461040b5780636c0360eb1461042a57806370a082311461043e578063715018a61461045d575f80fd5b80633f4ba83a11610173578063589ce52a11610143578063589ce52a146103815780635ab801a6146103a25780635c975abb146103d55780636352211e146103ec575f80fd5b80633f4ba83a1461031057806342842e0e1461032457806352ebd3151461034357806355f804b314610362575f80fd5b8063200e7d23116101ae578063200e7d231461028c57806323b872dd146102ab5780632a55205a146102ca5780633ccfd60b14610308575f80fd5b806301ffc9a7146101df57806306fdde0314610213578063081812fc14610234578063095ea7b31461026b575b5f80fd5b3480156101ea575f80fd5b506101fe6101f93660046120e0565b610634565b60405190151581526020015b60405180910390f35b34801561021e575f80fd5b50610227610644565b60405161020a9190612148565b34801561023f575f80fd5b5061025361024e36600461215a565b6106d3565b6040516001600160a01b03909116815260200161020a565b348015610276575f80fd5b5061028a610285366004612185565b6106fa565b005b348015610297575f80fd5b5061028a6102a63660046121af565b610709565b3480156102b6575f80fd5b5061028a6102c53660046121e5565b61082d565b3480156102d5575f80fd5b506102e96102e4366004612223565b6108b6565b604080516001600160a01b03909316835260208301919091520161020a565b61028a610939565b34801561031b575f80fd5b5061028a6109c0565b34801561032f575f80fd5b5061028a61033e3660046121e5565b6109e2565b34801561034e575f80fd5b5061028a61035d366004612257565b6109fc565b34801561036d575f80fd5b5061028a61037c366004612317565b610ac8565b61039461038f366004612349565b610b64565b60405190815260200161020a565b3480156103ad575f80fd5b506102537f000000000000000000000000000000000000000000000000000000000000000081565b3480156103e0575f80fd5b5060095460ff166101fe565b3480156103f7575f80fd5b5061025361040636600461215a565b610ca7565b348015610416575f80fd5b5061028a6104253660046123b1565b610cb1565b348015610435575f80fd5b50610227610dd1565b348015610449575f80fd5b506103946104583660046123df565b610e5d565b348015610468575f80fd5b5061028a610ea2565b34801561047c575f80fd5b5061028a610eb3565b348015610490575f80fd5b5060095461010090046001600160a01b0316610253565b3480156104b2575f80fd5b50610227610ecb565b3480156104c6575f80fd5b5061028a6104d53660046123fa565b610eda565b3480156104e5575f80fd5b506105156104f436600461215a565b600f6020525f9081526040902080546001909101546001600160a01b031682565b604080519283526001600160a01b0390911660208301520161020a565b34801561053d575f80fd5b5061028a61054c36600461242a565b610ee5565b34801561055c575f80fd5b5061022761056b36600461215a565b610efd565b34801561057b575f80fd5b50600d54610253906001600160a01b031681565b34801561059a575f80fd5b506101fe6105a93660046124a5565b611000565b3480156105b9575f80fd5b506102276040518060400160405280601981526020017f46616d654775696c64204e4654204d61726b6574706c6163650000000000000081525081565b348015610601575f80fd5b50600c54610253906001600160a01b031681565b348015610620575f80fd5b5061028a61062f3660046123df565b61102d565b5f61063e8261106a565b92915050565b60605f8054610652906124d1565b80601f016020809104026020016040519081016040528092919081815260200182805461067e906124d1565b80156106c95780601f106106a0576101008083540402835291602001916106c9565b820191905f5260205f20905b8154815290600101906020018083116106ac57829003601f168201915b5050505050905090565b5f6106dd8261108e565b505f828152600460205260409020546001600160a01b031661063e565b6107058282336110c6565b5050565b6107116110d3565b61071961112c565b3361072384610ca7565b6001600160a01b03161461077e5760405162461bcd60e51b815260206004820152601c60248201527f4e6f7420746865206f776e6572206f662074686520546f6b656e49440000000060448201526064015b60405180910390fd5b5f838152600f602090815260409182902084815560010180546001600160a01b0319166001600160a01b038516179055905183815284917fa0f1665b7b659537b52deec61ea64d134a3bccda74c7f4e79f2246e7a8187a8a910160405180910390a26040516001600160a01b038216815283907f39db75df3ed66fe2043917ea45436f0ce2bb4ad1ebdf46101203e09b4e7550da9060200160405180910390a26108286001600a55565b505050565b6001600160a01b03821661085657604051633250574960e11b81525f6004820152602401610775565b5f610862838333611172565b9050836001600160a01b0316816001600160a01b0316146108b0576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610775565b50505050565b5f82815260086020526040812080548291906001600160a01b03811690600160a01b90046001600160601b0316816109095750506007546001600160a01b03811690600160a01b90046001600160601b03165b5f6127106109206001600160601b03841689612509565b61092a919061252c565b92989297509195505050505050565b610941611264565b6109496110d3565b61095161112c565b6040514790339082156108fc029083905f818181858888f1935050505015801561097d573d5f803e3d5ffd5b5060405181815233907f053fa1fc52294a40b4ff1a988765bd298c00caa24d685cc3f767dcfde254ef9a9060200160405180910390a2506109be6001600a55565b565b6109c8611264565b6109d06110d3565b6109d8611297565b6109be6001600a55565b61082883838360405180602001604052805f815250610ee5565b610a04611264565b610a0c61112c565b612710816001600160601b03161115610a7e5760405162461bcd60e51b815260206004820152602e60248201527f526f79616c74792070657263656e74616765206d75737420626520626574776560448201526d656e20302520616e64203130302560901b6064820152608401610775565b610a8833826112e9565b6040516001600160601b03821681527fef6d7d5e1b11e048176dfc02d11f0044411de2d0a5c7a42e76132cedafcb0f12906020015b60405180910390a150565b610ad0611264565b610ad861112c565b5f815111610b285760405162461bcd60e51b815260206004820152601860248201527f42617365205552492063616e6e6f7420626520656d70747900000000000000006044820152606401610775565b600e610b34828261258f565b507f6741b2fc379fad678116fe3d4d4b9a1a184ab53ba36b86ad0fa66340b1ab41ad81604051610abd9190612148565b5f610b6d611264565b610b756110d3565b610b7d61112c565b5f845111610bcd5760405162461bcd60e51b815260206004820152601960248201527f546f6b656e205552492063616e6e6f7420626520656d707479000000000000006044820152606401610775565b5f610bd78661138b565b9050610be38184611428565b5f610bed600b5490565b9050610bfd600b80546001019055565b6040805180820182528881526001600160a01b0386811660208084019182525f868152600f90915293909320915182559151600190910180546001600160a01b03191691909216179055610c513382611659565b610c5b8187611672565b610c668133876116c1565b604051339082907f0176f203df400d7bd5f1b1c9ef36c16709bf3b5d9fd35f000a6bae32393f66c3905f90a3915050610c9f6001600a55565b949350505050565b5f61063e8261108e565b610cb961112c565b33610cc383610ca7565b6001600160a01b031614610d195760405162461bcd60e51b815260206004820152601c60248201527f4e6f7420746865206f776e6572206f662074686520546f6b656e4944000000006044820152606401610775565b612710816001600160601b03161115610d845760405162461bcd60e51b815260206004820152602760248201527f526f79616c747920666565206d757374206265206265747765656e20302520616044820152666e64203130302560c81b6064820152608401610775565b610d8f8233836116c1565b6040516001600160601b038216815282907f301fd0e501919f5cfbf3efbd87d9c7c75f4525b1b3fc8851f2de8a1b6eac9c1c9060200160405180910390a25050565b600e8054610dde906124d1565b80601f0160208091040260200160405190810160405280929190818152602001828054610e0a906124d1565b8015610e555780601f10610e2c57610100808354040283529160200191610e55565b820191905f5260205f20905b815481529060010190602001808311610e3857829003601f168201915b505050505081565b5f6001600160a01b038216610e87576040516322718ad960e21b81525f6004820152602401610775565b506001600160a01b03165f9081526003602052604090205490565b610eaa611264565b6109be5f611781565b610ebb611264565b610ec36110d3565b6109d86117da565b606060018054610652906124d1565b610705338383611817565b610ef084848461082d565b6108b033858585856118b5565b6060610f088261108e565b505f8281526006602052604081208054610f21906124d1565b80601f0160208091040260200160405190810160405280929190818152602001828054610f4d906124d1565b8015610f985780601f10610f6f57610100808354040283529160200191610f98565b820191905f5260205f20905b815481529060010190602001808311610f7b57829003601f168201915b505050505090505f610fb460408051602081019091525f815290565b905080515f03610fc5575092915050565b815115610ff7578082604051602001610fdf92919061264b565b60405160208183030381529060405292505050919050565b610c9f846119dd565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b611035611264565b6001600160a01b03811661105e57604051631e4fbdf760e01b81525f6004820152602401610775565b61106781611781565b50565b5f6001600160e01b0319821663152a902d60e11b148061063e575061063e82611a4d565b5f818152600260205260408120546001600160a01b03168061063e57604051637e27328960e01b815260048101849052602401610775565b6108288383836001611a71565b6002600a54036111255760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610775565b6002600a55565b60095460ff16156109be5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610775565b5f828152600260205260408120546001600160a01b039081169083161561119e5761119e818486611b75565b6001600160a01b038116156111d8576111b95f855f80611a71565b6001600160a01b0381165f90815260036020526040902080545f190190555b6001600160a01b03851615611206576001600160a01b0385165f908152600360205260409020805460010190555b5f8481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6009546001600160a01b036101009091041633146109be5760405163118cdaa760e01b8152336004820152602401610775565b61129f611bd9565b6009805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6127106001600160601b03821681101561132857604051636f483d0960e01b81526001600160601b038316600482015260248101829052604401610775565b6001600160a01b03831661135157604051635b6cc80560e11b81525f6004820152602401610775565b50604080518082019091526001600160a01b039092168083526001600160601b039091166020909201829052600160a01b90910217600755565b5f611394611c22565b600c546040805163fea3b9c360e01b815290515f926001600160a01b03169163fea3b9c39160048083019260209291908290030181865afa1580156113db573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906113ff9190612679565b90506127106114176001600160601b03831685612509565b611421919061252c565b9392505050565b6001600160a01b0381166114c957813410156114925760405162461bcd60e51b8152602060048201526024808201527f496e73756666696369656e74207061796d656e7420696e206e6174697665207460448201526337b5b2b760e11b6064820152608401610775565b600d546040516001600160a01b039091169083156108fc029084905f818181858888f19350505050158015610828573d5f803e3d5ffd5b6040516370a0823160e01b8152336004820152819083906001600160a01b038316906370a0823190602401602060405180830381865afa15801561150f573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115339190612694565b10156115815760405162461bcd60e51b815260206004820152601a60248201527f496e73756666696369656e7420746f6b656e2062616c616e63650000000000006044820152606401610775565b604051636eb1769f60e11b815233600482015230602482015283906001600160a01b0383169063dd62ed3e90604401602060405180830381865afa1580156115cb573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906115ef9190612694565b101561163d5760405162461bcd60e51b815260206004820152601c60248201527f496e73756666696369656e7420746f6b656e20616c6c6f77616e6365000000006044820152606401610775565b600d54610828906001600160a01b038381169133911686611d76565b610705828260405180602001604052805f815250611dd0565b5f828152600660205260409020611689828261258f565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b6127106001600160601b0382168110156117075760405163dfd1fc1b60e01b8152600481018590526001600160601b038316602482015260448101829052606401610775565b6001600160a01b03831661173757604051634b4f842960e11b8152600481018590525f6024820152604401610775565b506040805180820182526001600160a01b0393841681526001600160601b0392831660208083019182525f968752600890529190942093519051909116600160a01b029116179055565b600980546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b6117e261112c565b6009805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586112cc3390565b6001600160a01b03821661184957604051630b61174360e31b81526001600160a01b0383166004820152602401610775565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b156119d657604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906118f79088908890879087906004016126ab565b6020604051808303815f875af1925050508015611931575060408051601f3d908101601f1916820190925261192e918101906126e7565b60015b611998573d80801561195e576040519150601f19603f3d011682016040523d82523d5f602084013e611963565b606091505b5080515f0361199057604051633250574960e11b81526001600160a01b0385166004820152602401610775565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b146119d457604051633250574960e11b81526001600160a01b0385166004820152602401610775565b505b5050505050565b60606119e88261108e565b505f6119fe60408051602081019091525f815290565b90505f815111611a1c5760405180602001604052805f815250611421565b80611a2684611de7565b604051602001611a3792919061264b565b6040516020818303038152906040529392505050565b5f6001600160e01b03198216632483248360e11b148061063e575061063e82611e77565b8080611a8557506001600160a01b03821615155b15611b46575f611a948461108e565b90506001600160a01b03831615801590611ac05750826001600160a01b0316816001600160a01b031614155b8015611ad35750611ad18184611000565b155b15611afc5760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610775565b8115611b445783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b611b80838383611ec6565b610828576001600160a01b038316611bae57604051637e27328960e01b815260048101829052602401610775565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610775565b60095460ff166109be5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610775565b611c2a61112c565b5f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663f5aac5e16040518163ffffffff1660e01b8152600401602060405180830381865afa158015611c87573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611cab9190612702565b905080600c5f6101000a8154816001600160a01b0302191690836001600160a01b031602179055507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663ee99205c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d2f573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611d539190612702565b600d80546001600160a01b0319166001600160a01b039290921691909117905550565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b1790526108b0908590611f27565b611dda8383611f93565b610828335f8585856118b5565b60605f611df383611ff4565b60010190505f8167ffffffffffffffff811115611e1257611e12612272565b6040519080825280601f01601f191660200182016040528015611e3c576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084611e4657509392505050565b5f6001600160e01b031982166380ac58cd60e01b1480611ea757506001600160e01b03198216635b5e139f60e01b145b8061063e57506301ffc9a760e01b6001600160e01b031983161461063e565b5f6001600160a01b03831615801590610c9f5750826001600160a01b0316846001600160a01b03161480611eff5750611eff8484611000565b80610c9f5750505f908152600460205260409020546001600160a01b03908116911614919050565b5f8060205f8451602086015f885af180611f46576040513d5f823e3d81fd5b50505f513d91508115611f5d578060011415611f6a565b6001600160a01b0384163b155b156108b057604051635274afe760e01b81526001600160a01b0385166004820152602401610775565b6001600160a01b038216611fbc57604051633250574960e11b81525f6004820152602401610775565b5f611fc883835f611172565b90506001600160a01b03811615610828576040516339e3563760e11b81525f6004820152602401610775565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106120325772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061205e576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061207c57662386f26fc10000830492506010015b6305f5e1008310612094576305f5e100830492506008015b61271083106120a857612710830492506004015b606483106120ba576064830492506002015b600a831061063e5760010192915050565b6001600160e01b031981168114611067575f80fd5b5f602082840312156120f0575f80fd5b8135611421816120cb565b5f5b838110156121155781810151838201526020016120fd565b50505f910152565b5f81518084526121348160208601602086016120fb565b601f01601f19169290920160200192915050565b602081525f611421602083018461211d565b5f6020828403121561216a575f80fd5b5035919050565b6001600160a01b0381168114611067575f80fd5b5f8060408385031215612196575f80fd5b82356121a181612171565b946020939093013593505050565b5f805f606084860312156121c1575f80fd5b833592506020840135915060408401356121da81612171565b809150509250925092565b5f805f606084860312156121f7575f80fd5b833561220281612171565b9250602084013561221281612171565b929592945050506040919091013590565b5f8060408385031215612234575f80fd5b50508035926020909101359150565b6001600160601b0381168114611067575f80fd5b5f60208284031215612267575f80fd5b813561142181612243565b634e487b7160e01b5f52604160045260245ffd5b5f67ffffffffffffffff808411156122a0576122a0612272565b604051601f8501601f19908116603f011681019082821181831017156122c8576122c8612272565b816040528093508581528686860111156122e0575f80fd5b858560208301375f602087830101525050509392505050565b5f82601f830112612308575f80fd5b61142183833560208501612286565b5f60208284031215612327575f80fd5b813567ffffffffffffffff81111561233d575f80fd5b610c9f848285016122f9565b5f805f806080858703121561235c575f80fd5b84359350602085013567ffffffffffffffff811115612379575f80fd5b612385878288016122f9565b935050604085013561239681612243565b915060608501356123a681612171565b939692955090935050565b5f80604083850312156123c2575f80fd5b8235915060208301356123d481612243565b809150509250929050565b5f602082840312156123ef575f80fd5b813561142181612171565b5f806040838503121561240b575f80fd5b823561241681612171565b9150602083013580151581146123d4575f80fd5b5f805f806080858703121561243d575f80fd5b843561244881612171565b9350602085013561245881612171565b925060408501359150606085013567ffffffffffffffff81111561247a575f80fd5b8501601f8101871361248a575f80fd5b61249987823560208401612286565b91505092959194509250565b5f80604083850312156124b6575f80fd5b82356124c181612171565b915060208301356123d481612171565b600181811c908216806124e557607f821691505b60208210810361250357634e487b7160e01b5f52602260045260245ffd5b50919050565b808202811582820484141761063e57634e487b7160e01b5f52601160045260245ffd5b5f8261254657634e487b7160e01b5f52601260045260245ffd5b500490565b601f82111561082857805f5260205f20601f840160051c810160208510156125705750805b601f840160051c820191505b818110156119d6575f815560010161257c565b815167ffffffffffffffff8111156125a9576125a9612272565b6125bd816125b784546124d1565b8461254b565b602080601f8311600181146125f0575f84156125d95750858301515b5f19600386901b1c1916600185901b1785556119d4565b5f85815260208120601f198616915b8281101561261e578886015182559484019460019091019084016125ff565b508582101561263b57878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f835161265c8184602088016120fb565b8351908301906126708183602088016120fb565b01949350505050565b5f60208284031215612689575f80fd5b815161142181612243565b5f602082840312156126a4575f80fd5b5051919050565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f906126dd9083018461211d565b9695505050505050565b5f602082840312156126f7575f80fd5b8151611421816120cb565b5f60208284031215612712575f80fd5b81516114218161217156fea26469706673582212201a6540c814891d19315bd48ab8bed66fb0c8dcbd51d5fd0e11ecafbeac36ea9a64736f6c63430008180033",
};
