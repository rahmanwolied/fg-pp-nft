import FeedbackComponent from "@site/src/pages/feedback.md";

# OrbisDB (Ceramic)

## Save Encrypted Data to OrbisDB on the Ceramic Network

Learn how to use Lit Protocol to encrypt messages and save them to OrbisDB, a decentralized relational database built on Ceramic.

---

## Objectives

At completion of this reading you should be able to:

- Create OrbisDB data models using the Orbis Studio.
- Authenticate users on Ceramic to allow them to write data to OrbisDB.
- Encrypt data with Lit Protocol and write mutation queries to save the encrypted data to OrbisDB.
- Decrypt data using Lit Protocol based on specified access control conditions.

---

## What is the Ceramic Network?

[Ceramic](https://ceramic.network/) is a decentralized data network that combines the strong data provenance and verifiability typically associated with blockchain networks with the cost efficiencies, scalability, and flexible querying capabilities of traditional database systems.

### How does it Work?

The Ceramic Protocol is built on decentralized event streams, where user accounts (enabled by decentralized identifiers, or [DIDs](https://developers.ceramic.network/protocol/accounts/decentralized-identifiers/)) cryptographically sign data events and submit them to the network. These events are synchronized across subscribing nodes in the network and arranged into event logs, or Ceramic "streams." Each stream offers the flexibility to hold various types of content, making Ceramic suitable for a wide range of data applications, including user profiles, posts, relationships, and more, while retaining the history of changes the stream has undergone throughout its lifetime.

To extend Ceramic's functionality, most developers utilize a database interface that sits on top of the Ceramic protocol enabling flexible options for preferred database types, hosting methods, and other developer tools.

For more information on how Ceramic works, visit [How it Works](https://ceramic.network/how-it-works).

## OrbisDB

OrbisDB is an open-source relational database that inherits data ownership, composability, and the decentralized properties of the network it’s built on (Ceramic). OrbisDB offers many developer-friendly features in a highly scalable way, including multiple ways to query data, a built-in dashboard UI, shared nodes for testing and iteration, and an ecosystem of plugins that extend its data functionality.

For this tutorial, we will be using Ceramic with OrbisDB to illustrate how developers can generate, store, and query simple encrypted messages.

This tutorial will use a message board example application to show how to create encrypted messages using Lit Protocol and save message instances to the Ceramic Network using OrbisDB.

To follow along, reference this [example repository](https://github.com/ceramicstudio/orbisdb-lit-example).

## Initial Setup

For this tutorial, you will need:

1. A browser wallet (MetaMask, Zerion, etc.)
2. Node v20

First, clone the repository and install your dependencies:

```bash
git clone https://github.com/ceramicstudio/orbisdb-lit-example && cd orbisdb-lit-example
npm install
```

Open the repository in your editor of choice to continue following along.

### Environment Setup

You will need to create a copy of the example environment file:

```bash
cp .env.example .env
```

The following sections include additional setup details:

**WalletConnect**

You must obtain a Client ID from WalletConnect as the demo uses it for its wallet provider. Log into your [WalletConnect Cloud Dashboard](https://cloud.walletconnect.com/) and create a new project (with the "App" type selected). Once created, copy the "Project ID" and assign it to `NEXT_PUBLIC_PROJECT_ID`.

**OrbisDB**

You will also need to configure a few variables to work with OrbisDB. To make things simple, we will use the hosted [OrbisDB Studio](https://studio.useorbis.com/) and the shared node instance it provides for this demo, but keep in mind that you can set up your own instance whenever you want (more details at [OrbisDB](https://useorbis.com/)).

First, go ahead and sign in with your wallet.

Once signed in, the studio will show the "Contexts" tab at the top. On the right-hand side, you will see your environment ID. Go ahead and assign that value to `NEXT_PUBLIC_ENV_ID` in your new .env file.

Next, set up a context. These help developers segment their data models and usage based on the applications they are meant for. Create a new context (you can call it "forum-app" if you'd like), and assign the resulting string to `NEXT_PUBLIC_CONTEXT_ID` in your .env file.

Finally, you will need to create the post table using the OrbisDB model builder feature that this application will use for storing user data. The table definition this application uses for posts is as follows:

```sql
-- LIST accountRelation
table post {
  to text 
  body text 
  chain text
  edited DateTime
  created DateTime
  ciphertext text
  accessControlConditions text
  accessControlConditionType text
}
```

As this guide will explore below, some of these fields are derived from arguments used by the Lit SDK. You will therefore need to keep track of these combinations to successfully decrypt your data (which this model is designed to do).

In your Orbis Studio view, select the "Model Builder" tab at the top and create a new model named "post" using the post definition above (using `string` in place of `text`). Once created, assign the resulting identifier to `NEXT_PUBLIC_POST_ID` in your .env file. 

*You can also optionally use the `NEXT_PUBLIC_POST_ID` already provided for you in the env.example file. You can find the definition on [Cerscan](https://cerscan.com/mainnet/stream/kjzl6hvfrbw6calfdu4psiffj36vtzjylox0n15vgejdr5jr8d3iotxsnfl3s1c)*


### Run the Application in Developer Mode

To run the application, first make sure you're running node version 20, and then run the `dev` command:

```bash
nvm use 20
npm run dev
```

Unlike the [ComposeDB tutorial](./ceramic-example.md), this application will not utilize a local node running on port 7007. Instead, this application uses the existing shared OrbisDB instance (the same one that the Orbis Studio uses). You can observe where this is implemented in the [OrbisContext](https://github.com/ceramicstudio/orbisdb-lit-example/blob/7680bae4f04c1363b36297701f94a5b66efcff84/context/OrbisContext.tsx#L36) contextual wrapper.

Developers can optionally spin up standalone OrbisDB instances with their own dedicated endpoints (while continuing to benefit from OrbisDB's network interoperability).

You can now navigate to localhost:3000 in your browser window to begin interacting with the UI.

### Authenticate with Ceramic

Upon opening the homepage in your browser, you will be prompted to connect your wallet. This will prompt an authentication request that you'll need to sign to create a new Ceramic session that will live in your browser.

<div style={{textAlign: 'center'}}>

![sign in with Ceramic](/img/ceramic-images/authentication.png)

</div>

Navigating back to your text editor, observe the `useEffect` lifecycle hook within /src/pages/index.tsx that checks the browser's local storage for an item with a "orbis:session" key. This session is derived from the [Orbis Contextual Wrapper](https://github.com/ceramicstudio/orbisdb-lit-example/blob/main/context/OrbisContext.tsx) component which leverages the OrbisDB SDK to create a new session if one does not already exist:

```typescript
const StartOrbisAuth = async (): Promise<OrbisConnectResult | undefined> => {
    const auth = new OrbisEVMAuth(window.ethereum);
    // Authenticate - this option persists the session in local storage
    const authResult: OrbisConnectResult = await orbis.connectUser({
        auth,
    });
    if (authResult.auth.session) {
        return authResult;
    }

    return undefined;
    };
```

The important item to recognize during this sequence is which DID method is being used. While Ceramic supports multiple [DID methods](https://developers.ceramic.network/protocol/accounts/decentralized-identifiers/), this application authorizes Ethereum accounts using [@didtools/pkh-ethereum](https://did.js.org/docs/api/modules/pkh_ethereum/) (visit [User Sessions](https://developers.ceramic.network/docs/composedb/guides/composedb-client/user-sessions) for more information).

This type of authentication flow offers a familiar "web2" experience allowing users to sign in once (thus generating a timebound session), removing the need to manually approve every transaction. In doing so, this method utilizes a root Ceramic `did:pkh` account with the user's wallet, and generates a temporary and resolvable Ceramic `did:key` account that lives in the browser's local storage, expiring after a default duration of 24 hours.

Once authenticated, you should now see a blank message board appear on the screen:

<div style={{textAlign: 'center'}}>

![blank message board](/img/ceramic-images//message_board.png)

</div>

If you now check your local storage, you'll also see a newly generated field with a "orbis:session" key and a serialized corresponding value.

Finally, navigating back to /src/pages/index.tsx, you'll also notice that a `startLitClient` method is invoked within the `useEffect` hook. This method is imported from /utils/client.ts and is meant to connect your host to LIT Protocol's network:

```typescript
const startLitClient = (window: Window): ILitNodeClient => {
    // connect to lit
    console.log("Starting Lit Client...");
    const client = new LitJsSdk.LitNodeClient({
      url: window.location.origin,
    });
    client.connect();
    return client as ILitNodeClient;
  };
```

### Generate Encrypted Messages

Now that we are authenticated with Ceramic, we can go ahead and send messages to the network. In your text editor, you'll notice that the component defined in `/src/components/Chat.tsx` imports and returns a `<ChatInputBox />` component (using the raw message contents and the user's address as props). If you navigate into `/src/fragments/chatinputbox.tsx`, you'll find a flow that involves both encryption with LIT and saving to Ceramic.

Locate the `doSendMessage` method definition. You'll notice that an array named `accessControlConditions` is defined within this method that uses [Boolean Logic](../../sdk/access-control/condition-types/boolean-logic) discussed in our access control section. In this simple example, we're setting access control conditions based on the user's address (in this case, requiring that the user's address be strictly equal to the one we're currently signed in with).

Next, you'll find an `encrypted` constant assigned to the evaluated result of invoking `encryptWithLit`, using the Lit client instance, the raw message, access control conditions, and the assigned chain as arguments. This method is imported from /utils/lit.ts. Similar to the Ceramic authentication flow outlined in the previous section, `encryptWithLit` first invoked a child method called `checkAndSignAuthMessage` that checks for an existing cryptographic authentication signature and creates one if it does not exist. The result of this signature is then stored in local storage so the user doesn't have to sign each time they perform an operation.

Observe how the child methods within `encryptWithLit` use the original arguments to eventually return an object that we will then save to OrbisDB.

Back in `/src/fragments/chatinputbox.tsx`, observe how the `insert` method on our `orbis` client class instance is invoked with the values we just generated from the LIT encryption sequence. It's important to note that mutation queries (such as this one) only work when a user is authenticated. Since we are importing the `useOrbisContext` wrapper from /context/OrbisContext.tsx, we are able to access the authenticated session we established in the last section from within any child components. You can also see how the `createPosts` mutation query accesses the table definitions we created in the Orbis Studio by importing them as client environment variables:

```typescript
const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain,
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: address,
          },
        },
      ];

const { ciphertext, dataToEncryptHash } = await encryptWithLit(
lit,
newMessage,
accessControlConditions,
chain
);

const stringified = JSON.stringify(accessControlConditions);
const b64 = new TextEncoder().encode(stringified);
const encoded = await encodeb64(b64);

await orbis.getConnectedUser(); // Get the connected user


const createQuery = await orbis
// insert into the posts table
.insert(POST_ID)
// using the encrypted payload and associated arguments
.value({
    body: dataToEncryptHash,
    to: address,
    created: new Date().toISOString(),
    ciphertext,
    chain,
    accessControlConditions: encoded,
    accessControlConditionType: "accessControlConditions",
})
// ensure that the stream is associated with our OrbisDB application context
.context(CONTEXT_ID)
// execute the query
.run();
```

If you've followed the steps above to submit an encrypted message, your UI should now look something like this:

<div style={{textAlign: 'center'}}>

![message board with encrypted message](/img/ceramic-images/lit_message.png)

</div>

### Querying Indexed Messages

Now that you've generated encrypted messages using LIT and saved them to your local Ceramic node using OrbisDB, you'll notice that every time you refresh the page, those messages are rendered in the UI.

If you navigate back to `/src/components/Chat.tsx`, you'll be able to observe why this is happening. You'll notice that a `getMessages` method is tied to the `useEffect` lifecycle hook. When invoked, this method queries your imported OrbisDB client using the option of running raw SQL. It's important to note that, unlike mutation queries, this read request works regardless if someone is authenticated or not:

```typescript
const user = await orbis.getConnectedUser();
if (user) {
const query = await orbis
    .select()
    // using raw SQL
    .raw(
    `SELECT *
        FROM ${env.NEXT_PUBLIC_POST_ID} as post
        ORDER BY created DESC`
    )
    .run();
const queryResult = query.rows as Post[];
if (queryResult.length) {
    queryResult.forEach((el: any) => {
    setChatMessages((prevMessages) => [
        ...prevMessages,
        {
        text: el.body,
        sentBy: el.controller.split(":")[4]!!,
        sentAt: new Date(el.created),
        isChatOwner: address === el.controller.split(":")[4]!!,
        ...el,
        },
    ]);
    });
  }
}
```

### Decrypting Messages

If you've followed along in the tutorial up until this point without switching to a different wallet address (meaning you're still logged into the one you used to generate a few messages), you'll see a "Decrypt" button within each message box rendered in the UI. This button renders conditionally based on whether you're the message author (see `src/fragments/chatcontent.tsx` for the conditional `message.isChatOwner`). However, even if we rendered this button for all users regardless of author, we can still rely on LIT to grant decryption access solely to users who meet the correct access control conditions.

In `/src/fragments/chatcontent.tsx` you can observe how this works. When you click the "Decrypt" button, this action invokes the `handleDecrypt` method with both an event pointer and the message contents relevant to that component instance. Similar to the sequence of events incurred when encrypting data with LIT, observe how the `decryptWithLit` method is invoked (after converting the message contents to their necessary formats).

The definition for this method lives in `/utils/lit.ts`, which checks for an existing cryptographic authentication signature in the browser's local storage. If the user is authorized, a `decryptToString` method is later invoked using the `litNodeClient` instance on the window object, along with the access control conditions, ciphertext, encrypted and hashed data, and chain. This will finally decrypt the message contents and allow us to render it in our UI.

If you press the "Decrypt" button, that corresponding message should now allow you to read its contents in plaintext:

<div style={{textAlign: 'center'}}>

![decrypted message](/img/ceramic-images/decrypted_message.png)

</div>

### Signing in as Different Users

If you want to simulate what the experience might look like with multiple users interacting with the application, make sure that you clear your local storage (in addition to disconnecting your current MetaMask account) each time you want to sign in with a different address.

## Learn More

To learn more about Ceramic please visit the following links

[Ceramic Documentation](https://developers.ceramic.network/learn/welcome/) - Learn more about the Ceramic Ecosystem.

To learn more about OrbisDB please visit the following links

- [OrbisDB Overview](https://developers.ceramic.network/docs/orbisdb/overview)
- [OrbisDB SDK](https://developers.ceramic.network/docs/orbisdb/orbisdb-sdk)
- [OrbisDB Website](https://useorbis.com/)

<FeedbackComponent/>
