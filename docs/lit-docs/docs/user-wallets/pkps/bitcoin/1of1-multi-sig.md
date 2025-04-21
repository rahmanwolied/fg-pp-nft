# 1-of-1 Multi Signature

This guide provides a simple example of using two PKPs (Programmable Key Pairs) to create a P2SH (Pay-to-Script-Hash) Bitcoin transaction only requiring one signature from either of the PKPs.

You can find a result of this example [here](https://mempool.space/tx/24fe5ff20e474f6ae47de3beaa01d619527ef2963b354fb7bf7f1d9cffb86f80). 

## Prerequisites

### UTXO Availability
Please make sure the P2SH Bitcoin address derived from your PKP public keys has at least one UTXO (Unspent Transaction Output). If you don't know the Bitcoin address derived from your multiple PKP public keys, you can run this example and the derived P2SH address will be output to the console. The example will use the first UTXO on your derived PKP address to send funds to the specified destination address. If there are no UTXOs, the PKPs will have no funds to spend, and the example will not run.

### Lit-Specific Requirements
- [LitNodeClient](../../../sdk/authentication/session-sigs/get-session-sigs.md#initializing-a-litnodeclient): Used to initialize connection with the Lit network.
- [Session Signatures](../../../sdk/authentication/session-sigs/intro.md): Authenticate your session with the Lit network.
- Ownership of two [PKPs](../../overview.md): The PKPs must be owned by the Ethereum wallet used to generate the Session Signatures.

### Custom Functions Used in This Example
- [`convertSignature`](./overview.md#formatting-the-signature): Converts a signature from the standard ECDSA format to the Bitcoin DER format.
- [`broadcastTransaction`](./overview.md#broadcasting-the-transaction): Broadcasts the signed transaction to the Bitcoin blockchain.
- [`litActionCode`](./overview.md#signing-within-a-lit-action): The Lit Action code executed to sign the transaction within the Lit network.

## Signing with Either PKP

After setting up the prerequisites, the `oneOfOneMultiSig` function can be used to sign a Bitcoin transaction.

In this example, we create the transaction and derived Bitcoin address using both PKPs, but only require the signature from the first PKP. Using the second PKP in the Lit Action execution will produce the same successful transaction.

For an understanding of the steps involved in this example, visit the [Detailed Overview Diagram](./overview.md#detailed-overview).

```tsx
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import mempoolJS from "@mempool/mempool.js";
import { LitNodeClient } from "@lit-protocol/lit-node-client";

bitcoin.initEccLib(ecc);

export async function oneOfOneMultiSig(litNodeClient: LitNodeClient, sessionSigs: any, pkpPublicKey1: string, pkpPublicKey2: string, destinationAddress: string) {
    const network = bitcoin.networks.bitcoin;
    const pubKeyBuffer_1 = Buffer.from(pkpPublicKey1, "hex");
    const pubKeyBuffer_2 = Buffer.from(pkpPublicKey2, "hex");

    const redeemScript = bitcoin.script.compile([
        bitcoin.opcodes.OP_1,
        pubKeyBuffer_1,
        pubKeyBuffer_2,
        bitcoin.opcodes.OP_2,
        bitcoin.opcodes.OP_CHECKMULTISIG,
    ]);

    const p2shPayment = bitcoin.payments.p2sh({
        redeem: { output: redeemScript },
        network: network,
    });

    const { bitcoin: { addresses, transactions } } = mempoolJS({
        hostname: "mempool.space",
        network: "mainnet",
    });

    const addressUtxos = await addresses.getAddressTxsUtxo({
        address: p2shPayment.address!,
    });
    console.log("P2SH Address:", p2shPayment.address);

    if (addressUtxos.length === 0) {
        console.log("No UTXOs found for address:", p2shPayment.address);
        return;
    }

    const utxo = addressUtxos[0];
    const psbt = new bitcoin.Psbt({ network });
    const utxoRawTx = await transactions.getTxHex({ txid: utxo.txid });

    psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(utxoRawTx, "hex"),
        redeemScript: redeemScript,
    });

    const fee = 1000;
    const amountToSend = utxo.value - fee;

    psbt.addOutput({
        address: destinationAddress,
        value: BigInt(amountToSend),
    });

    //@ts-ignore
    const tx = psbt.__CACHE.__TX.clone();
    const sighash = tx.hashForSignature(
        0,
        redeemScript,
        bitcoin.Transaction.SIGHASH_ALL
    );

    const litActionResponse = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs,
    jsParams: {
        publicKey: pkpPublicKey1,
        toSign: Buffer.from(sighash, "hex"),
    },
    });

    const signatureWithHashType = await convertSignature(
        litActionResponse.signatures.btcSignature
    );

    psbt.updateInput(0, {
        finalScriptSig: bitcoin.script.compile([
        bitcoin.opcodes.OP_0,
        signatureWithHashType,
        redeemScript,
        ]),
    });

    const txHex = psbt.extractTransaction().toHex();
    return await broadcastTransaction(txHex);
}
```

## Summary

In this guide, you learned how to use a PKP (Programmable Key Pairs) to sign a Bitcoin transaction with a 1-of-1 multi signature in a P2SH (Pay-to-Script-Hash) context.

If you'd like to see other methods of using PKPs to sign Bitcoin transactions, check out our examples listed [here](./overview.md#p2sh-examples).