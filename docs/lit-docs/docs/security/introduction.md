
# Introduction

The following section provides a highly detailed and technical overview of how the Lit network keeps data and assets secure. For an introductory overview of how Lit works, check out the [how it works](../resources/how-it-works.md) section.

Lit uses Multi-Party Computation Threshold Signature Schemes (MPC TSS) and Trusted Execution Environments (TEEs) to manage secrets, perform signing and decryption operations, and execute Lit Actions. Each of these is actioned by every node in parallel and requires participation from more than two-thirds of the network to be executed. 

MPC TSS eliminates the central points of failure associated with key management, preventing any single entity from compromising or unilaterally accessing the private key material and other secrets managed by the network.

The use of TEEs provide hardware-enforced isolation, ensuring that even if an adversary gains control of a node’s infrastructure, **they cannot extract private key shares, manipulate computation outputs, or interfere with cryptographic execution**.
