import FeedbackComponent from "@site/src/pages/feedback.md";

# Connecting PKPs to dApps

Leverage Lit Protocol and WalletConnect V2 to seamlessly connect PKPs to hundreds of dApps. WalletConnect enables secure communication between wallets and dApps through QR code scanning and deep linking. With WalletConnect, PKPs act as MPC wallets, interacting with dApps without ever exposing private keys.

This guide will show you how to implement this for an Ethereum wallet. If you'd like to do the same for [Sui](https://github.com/LIT-Protocol/js-sdk/tree/master/packages/pkp-sui) with `PKPSuiWallet` or [Cosmos](https://github.com/LIT-Protocol/js-sdk/tree/master/packages/pkp-cosmos) with `PKPCosmosWallet`. 

Please note that this example requires you install the `@walletconnect/web3wallet` package.

## 1. Create a `PKPClient`

Connecting a PKP to a dApp requires:

1. Creation of a `PKPEthersWallet`
2. Initialization of  `PKPWalletConnect` using the `PKPEthersWallet`
3. Subscribing and responding to events

```js
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK, LIT_ABILITY, LIT_RPC } from "@lit-protocol/constants";
import {
  createSiweMessage,
  generateAuthSig,
  LitPKPResource
} from "@lit-protocol/auth-helpers";
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { PKPWalletConnect } from "@lit-protocol/pkp-walletconnect";
import * as ethers from "ethers";

const ETHEREUM_PRIVATE_KEY = "<Your Ethereum private key>";
const LIT_PKP_PUBLIC_KEY = "<Your Lit PKP public key>";

const ethersWallet = new ethers.Wallet(
  ETHEREUM_PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
);

const litNodeClient = new LitNodeClient({
      litNetwork: LIT_NETWORK.DatilDev,
      debug: false,
    });
    await litNodeClient.connect();

const sessionSignatures = await litNodeClient.getSessionSigs({
  chain: "ethereum",
  expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
  resourceAbilityRequests: [
    {
      resource: new LitPKPResource("*"),
      ability: LIT_ABILITY.PKPSigning,
    },
  ],
  authNeededCallback: async ({
    uri,
    expiration,
    resourceAbilityRequests,
  }) => {
    const toSign = await createSiweMessage({
      uri,
      expiration,
      resources: resourceAbilityRequests,
      walletAddress: await ethersWallet.getAddress(),
      nonce: await litNodeClient.getLatestBlockhash(),
      litNodeClient,
    });

    return await generateAuthSig({
      signer: ethersWallet,
      toSign,
    });
  },
});

const pkpEthersWallet = new PKPEthersWallet({
  litNodeClient,
  pkpPubKey: LIT_PKP_PUBLIC_KEY!,
  controllerSessionSigs: sessionSignatures
});


const pkpWalletConnect = new PKPWalletConnect();
pkpWalletConnect.addPKPEthersWallet(pkpEthersWallet);
```

The `authContext` or `controllerSessionSigs` are used to authorize requests to the Lit nodes. The only difference between these methods are that `controllerSessionSigs` accepts the Session Signatures object, while `authContext` accepts the same properties that Session Signatures do during creation. Those properties can be found [here](https://v6-api-doc-lit-js-sdk.vercel.app/interfaces/types_src.AuthenticationProps.html#getSessionSigsProps).

## 2. Initialize `PKPWalletConnect` with the `PKPClient`

`PKPWalletConnect` wraps [`@walletconnect/web3wallet`](https://www.npmjs.com/package/@walletconnect/web3wallet) to manage WalletConnect session proposals and requests using the given PKPClient.

```js
const config = {
  projectId: "<Your WalletConnect project ID>",
  metadata: {
    name: "Test Lit Wallet",
    description: "Test Lit Wallet",
    url: "https://litprotocol.com/",
    icons: ["https://litprotocol.com/favicon.png"],
  },
};

await pkpWalletConnect.initWalletConnect(config);
```

## 3. Subscribe and respond to events

### Session Proposal

Once the WalletConnect client is initialized, the PKP is ready to connect to dApps. The dApp will request to connect to your PKP through a session proposal. To respond to session proposals, subscribe to the `session_proposal` event.

```js
pkpWalletConnect.on("session_proposal", async (proposal) => {
  console.log("Received session proposal: ", proposal);

  // Accept session proposal
  await pkpWalletConnect.approveSessionProposal(proposal);

  // Log active sessions
  const sessions = Object.values(pkpWalletConnect.getActiveSessions());
  for (const session of sessions) {
    const { name, url } = session.peer.metadata;
    console.log(`Active Session: ${name} (${url})`);
  }
});
```

To trigger the session proposal, visit any WalletConnect V2 compatible dApp to obtain an URI. For an example, navigate to WalletConnect's [test dApp](https://react-app.walletconnect.com/), choose 'Ethereum' network, and click "Connect". A "Connect wallet" modal should appear with a copy icon located at the top right. Click on the icon to copy the URI.

```js
// Pair using the given URI
await pkpWalletConnect.pair({ uri: uri });
```

### Session Request

Once the session proposal is approved, the dApp can then request your PKP to perform actions, such as signing, via a session request. To acknowledge and respond to these session requests, set up an event listener for the `session_request` event.

```js
pkpWalletConnect.on("session_request", async (requestEvent) => {
  console.log("Received session request: ", requestEvent);

  const { topic, params } = requestEvent;
  const { request } = params;
  const requestSession = signClient.session.get(topic);
  const { name, url } = requestSession.peer.metadata;

  // Accept session request
  console.log(
    `\nApproving ${request.method} request for session ${name} (${url})...\n`
  );
  await pkpWalletConnect.approveSessionRequest(requestEvent);
  console.log(
    `Check the ${name} dapp to confirm whether the request was approved`
  );
});
```

## Using `SignClient`

The `@lit-protocol/pkp-walletconnect` library exposes base functionality needed to pair PKPs to dApps, approve and reject session proposals, and respond to session requests. For extended capabilities, you can retrieve WalletConnect's `SignClient` from the `PKPWalletConnect` instance.

```js
const signClient = pkpWalletConnect.getSignClient();
```

Refer to the [WalletConnect V2 docs](https://docs.walletconnect.com/2.0/) for more information on their protocol and SDKs.

<FeedbackComponent/>
