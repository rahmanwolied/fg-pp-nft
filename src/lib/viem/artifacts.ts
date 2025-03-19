export const artifacts = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
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
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "tokenURI",
          type: "string",
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
      inputs: [],
      name: "MAX_SUPPLY",
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
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      name: "mintNFT",
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
      name: "mintPrice",
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
      name: "renounceOwnership",
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
          name: "baseURI",
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
          internalType: "uint256",
          name: "newPrice",
          type: "uint256",
        },
      ],
      name: "setMintPrice",
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
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
  bytecode:
    "608060405266b1a2bc2ec50000600a553480156200001b575f80fd5b5060405162001a9c38038062001a9c8339810160408190526200003e91620001b4565b3382825f6200004e8382620002a4565b5060016200005d8282620002a4565b5050506001600160a01b0381166200008e57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b6200009981620000a2565b50505062000370565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f83011262000117575f80fd5b81516001600160401b0380821115620001345762000134620000f3565b604051601f8301601f19908116603f011681019082821181831017156200015f576200015f620000f3565b81604052838152602092508660208588010111156200017c575f80fd5b5f91505b838210156200019f578582018301518183018401529082019062000180565b5f602085830101528094505050505092915050565b5f8060408385031215620001c6575f80fd5b82516001600160401b0380821115620001dd575f80fd5b620001eb8683870162000107565b9350602085015191508082111562000201575f80fd5b50620002108582860162000107565b9150509250929050565b600181811c908216806200022f57607f821691505b6020821081036200024e57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200029f57805f5260205f20601f840160051c810160208510156200027b5750805b601f840160051c820191505b818110156200029c575f815560010162000287565b50505b505050565b81516001600160401b03811115620002c057620002c0620000f3565b620002d881620002d184546200021a565b8462000254565b602080601f8311600181146200030e575f8415620002f65750858301515b5f19600386901b1c1916600185901b17855562000368565b5f85815260208120601f198616915b828110156200033e578886015182559484019460019091019084016200031d565b50858210156200035c57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b61171e806200037e5f395ff3fe608060405260043610610131575f3560e01c806370a08231116100a8578063b88d4fde1161006d578063b88d4fde1461032d578063c87b56dd1461034c578063e985e9c51461036b578063eacabe141461038a578063f2fde38b1461039d578063f4a0a528146103bc575f80fd5b806370a08231146102aa578063715018a6146102c95780638da5cb5b146102dd57806395d89b41146102fa578063a22cb4651461030e575f80fd5b806332cb6b0c116100f957806332cb6b0c146102015780633ccfd60b1461022457806342842e0e1461023857806355f804b3146102575780636352211e146102765780636817c76c14610295575f80fd5b806301ffc9a71461013557806306fdde0314610169578063081812fc1461018a578063095ea7b3146101c157806323b872dd146101e2575b5f80fd5b348015610140575f80fd5b5061015461014f3660046111d3565b6103db565b60405190151581526020015b60405180910390f35b348015610174575f80fd5b5061017d610405565b604051610160919061123b565b348015610195575f80fd5b506101a96101a436600461124d565b610494565b6040516001600160a01b039091168152602001610160565b3480156101cc575f80fd5b506101e06101db36600461127f565b6104bb565b005b3480156101ed575f80fd5b506101e06101fc3660046112a7565b6104ca565b34801561020c575f80fd5b5061021661271081565b604051908152602001610160565b34801561022f575f80fd5b506101e0610558565b348015610243575f80fd5b506101e06102523660046112a7565b610649565b348015610262575f80fd5b506101e0610271366004611385565b610668565b348015610281575f80fd5b506101a961029036600461124d565b61067c565b3480156102a0575f80fd5b50610216600a5481565b3480156102b5575f80fd5b506102166102c43660046113b7565b610686565b3480156102d4575f80fd5b506101e06106cb565b3480156102e8575f80fd5b506007546001600160a01b03166101a9565b348015610305575f80fd5b5061017d6106de565b348015610319575f80fd5b506101e06103283660046113d0565b6106ed565b348015610338575f80fd5b506101e0610347366004611409565b6106f8565b348015610357575f80fd5b5061017d61036636600461124d565b610710565b348015610376575f80fd5b50610154610385366004611480565b61080f565b6102166103983660046114b1565b61083c565b3480156103a8575f80fd5b506101e06103b73660046113b7565b610956565b3480156103c7575f80fd5b506101e06103d636600461124d565b610993565b5f6001600160e01b03198216632483248360e11b14806103ff57506103ff826109a0565b92915050565b60605f8054610413906114fc565b80601f016020809104026020016040519081016040528092919081815260200182805461043f906114fc565b801561048a5780601f106104615761010080835404028352916020019161048a565b820191905f5260205f20905b81548152906001019060200180831161046d57829003601f168201915b5050505050905090565b5f61049e826109ef565b505f828152600460205260409020546001600160a01b03166103ff565b6104c6828233610a27565b5050565b6001600160a01b0382166104f857604051633250574960e11b81525f60048201526024015b60405180910390fd5b5f610504838333610a34565b9050836001600160a01b0316816001600160a01b031614610552576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016104ef565b50505050565b610560610b26565b47806105a55760405162461bcd60e51b81526020600482015260146024820152734e6f2066756e647320746f20776974686472617760601b60448201526064016104ef565b5f6105b86007546001600160a01b031690565b6001600160a01b0316826040515f6040518083038185875af1925050503d805f81146105ff576040519150601f19603f3d011682016040523d82523d5f602084013e610604565b606091505b50509050806104c65760405162461bcd60e51b815260206004820152601160248201527015da5d1a191c985dd85b0819985a5b1959607a1b60448201526064016104ef565b61066383838360405180602001604052805f8152506106f8565b505050565b610670610b26565b60096104c68282611578565b5f6103ff826109ef565b5f6001600160a01b0382166106b0576040516322718ad960e21b81525f60048201526024016104ef565b506001600160a01b03165f9081526003602052604090205490565b6106d3610b26565b6106dc5f610b53565b565b606060018054610413906114fc565b6104c6338383610ba4565b6107038484846104ca565b6105523385858585610c42565b606061071b826109ef565b505f8281526006602052604081208054610734906114fc565b80601f0160208091040260200160405190810160405280929190818152602001828054610760906114fc565b80156107ab5780601f10610782576101008083540402835291602001916107ab565b820191905f5260205f20905b81548152906001019060200180831161078e57829003601f168201915b505050505090505f6107bb610d6a565b905080515f036107cc575092915050565b8151156107fe5780826040516020016107e6929190611634565b60405160208183030381529060405292505050919050565b61080784610d79565b949350505050565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f61271061084960085490565b1061088b5760405162461bcd60e51b815260206004820152601260248201527113585e081cdd5c1c1b1e481c995858da195960721b60448201526064016104ef565b6007546001600160a01b031633146108e657600a543410156108e65760405162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b60448201526064016104ef565b6108f4600880546001019055565b5f6108fe60085490565b905061090a8482610dde565b6109148184610e3f565b7fd35bb95e09c04b219e35047ce7b7b300e3384264ef84a40456943dbc0fc17c1484828560405161094793929190611662565b60405180910390a19392505050565b61095e610b26565b6001600160a01b03811661098757604051631e4fbdf760e01b81525f60048201526024016104ef565b61099081610b53565b50565b61099b610b26565b600a55565b5f6001600160e01b031982166380ac58cd60e01b14806109d057506001600160e01b03198216635b5e139f60e01b145b806103ff57506301ffc9a760e01b6001600160e01b03198316146103ff565b5f818152600260205260408120546001600160a01b0316806103ff57604051637e27328960e01b8152600481018490526024016104ef565b6106638383836001610e8e565b5f828152600260205260408120546001600160a01b0390811690831615610a6057610a60818486610f92565b6001600160a01b03811615610a9a57610a7b5f855f80610e8e565b6001600160a01b0381165f90815260036020526040902080545f190190555b6001600160a01b03851615610ac8576001600160a01b0385165f908152600360205260409020805460010190555b5f8481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6007546001600160a01b031633146106dc5760405163118cdaa760e01b81523360048201526024016104ef565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b6001600160a01b038216610bd657604051630b61174360e31b81526001600160a01b03831660048201526024016104ef565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b15610d6357604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610c84908890889087908790600401611691565b6020604051808303815f875af1925050508015610cbe575060408051601f3d908101601f19168201909252610cbb918101906116cd565b60015b610d25573d808015610ceb576040519150601f19603f3d011682016040523d82523d5f602084013e610cf0565b606091505b5080515f03610d1d57604051633250574960e11b81526001600160a01b03851660048201526024016104ef565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610d6157604051633250574960e11b81526001600160a01b03851660048201526024016104ef565b505b5050505050565b606060098054610413906114fc565b6060610d84826109ef565b505f610d8e610d6a565b90505f815111610dac5760405180602001604052805f815250610dd7565b80610db684610ff6565b604051602001610dc7929190611634565b6040516020818303038152906040525b9392505050565b6001600160a01b038216610e0757604051633250574960e11b81525f60048201526024016104ef565b5f610e1383835f610a34565b90506001600160a01b03811615610663576040516339e3563760e11b81525f60048201526024016104ef565b5f828152600660205260409020610e568282611578565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b8080610ea257506001600160a01b03821615155b15610f63575f610eb1846109ef565b90506001600160a01b03831615801590610edd5750826001600160a01b0316816001600160a01b031614155b8015610ef05750610eee818461080f565b155b15610f195760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016104ef565b8115610f615783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610f9d838383611086565b610663576001600160a01b038316610fcb57604051637e27328960e01b8152600481018290526024016104ef565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016104ef565b60605f611002836110e7565b60010190505f8167ffffffffffffffff811115611021576110216112e0565b6040519080825280601f01601f19166020018201604052801561104b576020820181803683370190505b5090508181016020015b5f19016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461105557509392505050565b5f6001600160a01b038316158015906108075750826001600160a01b0316846001600160a01b031614806110bf57506110bf848461080f565b806108075750505f908152600460205260409020546001600160a01b03908116911614919050565b5f8072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106111255772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611151576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061116f57662386f26fc10000830492506010015b6305f5e1008310611187576305f5e100830492506008015b612710831061119b57612710830492506004015b606483106111ad576064830492506002015b600a83106103ff5760010192915050565b6001600160e01b031981168114610990575f80fd5b5f602082840312156111e3575f80fd5b8135610dd7816111be565b5f5b838110156112085781810151838201526020016111f0565b50505f910152565b5f81518084526112278160208601602086016111ee565b601f01601f19169290920160200192915050565b602081525f610dd76020830184611210565b5f6020828403121561125d575f80fd5b5035919050565b80356001600160a01b038116811461127a575f80fd5b919050565b5f8060408385031215611290575f80fd5b61129983611264565b946020939093013593505050565b5f805f606084860312156112b9575f80fd5b6112c284611264565b92506112d060208501611264565b9150604084013590509250925092565b634e487b7160e01b5f52604160045260245ffd5b5f67ffffffffffffffff8084111561130e5761130e6112e0565b604051601f8501601f19908116603f01168101908282118183101715611336576113366112e0565b8160405280935085815286868601111561134e575f80fd5b858560208301375f602087830101525050509392505050565b5f82601f830112611376575f80fd5b610dd7838335602085016112f4565b5f60208284031215611395575f80fd5b813567ffffffffffffffff8111156113ab575f80fd5b61080784828501611367565b5f602082840312156113c7575f80fd5b610dd782611264565b5f80604083850312156113e1575f80fd5b6113ea83611264565b9150602083013580151581146113fe575f80fd5b809150509250929050565b5f805f806080858703121561141c575f80fd5b61142585611264565b935061143360208601611264565b925060408501359150606085013567ffffffffffffffff811115611455575f80fd5b8501601f81018713611465575f80fd5b611474878235602084016112f4565b91505092959194509250565b5f8060408385031215611491575f80fd5b61149a83611264565b91506114a860208401611264565b90509250929050565b5f80604083850312156114c2575f80fd5b6114cb83611264565b9150602083013567ffffffffffffffff8111156114e6575f80fd5b6114f285828601611367565b9150509250929050565b600181811c9082168061151057607f821691505b60208210810361152e57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561066357805f5260205f20601f840160051c810160208510156115595750805b601f840160051c820191505b81811015610d63575f8155600101611565565b815167ffffffffffffffff811115611592576115926112e0565b6115a6816115a084546114fc565b84611534565b602080601f8311600181146115d9575f84156115c25750858301515b5f19600386901b1c1916600185901b178555610d61565b5f85815260208120601f198616915b82811015611607578886015182559484019460019091019084016115e8565b508582101561162457878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f83516116458184602088016111ee565b8351908301906116598183602088016111ee565b01949350505050565b60018060a01b0384168152826020820152606060408201525f6116886060830184611210565b95945050505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f906116c390830184611210565b9695505050505050565b5f602082840312156116dd575f80fd5b8151610dd7816111be56fea2646970667358221220b9bc3510d4631a60cc829605d5f89abd6c06ad1370aabfe4039275886be3e60964736f6c63430008180033",
};
