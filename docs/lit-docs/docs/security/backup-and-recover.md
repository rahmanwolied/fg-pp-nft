# Backup and Recovery

Staking $LITKEY provides the first level of resilience for the network, ensuring that should a node want to leave the network, they do so gracefully. For an additional layer of security, a backup and recovery process has been implemented to ensure that the network can be recovered even in the case that a threshold of the active node set goes permanently offline.

## Verifiable Backups

All keys in the network are either root keys or derived hierarchically from the root keys. These root keys are generated during each distributed key generation process (DKG) in which each Lit node generates and holds a share of each key. To ensure these key shares are safe and can be recovered as needed, they're encrypted and backed up using a dedicated recovery party and verifiable encryption. The verifiable encryption process ensures that the ciphertext (in this case, each encrypted key share) meets certain properties which allow its public key to be used to confirm that all encrypted root key shares are genuine. Every time new root keys are produced, nodes update the backups they have stored with the new data.

The backups ensure that if the available key shares were to ever fall below threshold the network could be recovered by importing the backups into a fresh set of nodes and decrypting them with the help of the node operators and the recovery party.

## The Recovery Party

To assist with the recovery process, a designated set of Recovery Party members are responsible for facilitating the decryption of encrypted root key shares. For a successful recovery, more than two-thirds of these members must participate—enabling a threshold-based decryption process that ensures no single party can perform recovery unilaterally.

Each encrypted backup is further protected using a Blinder, a symmetric encryption key held by each node operator. This additional layer ensures that even if the Recovery Party is compromised, the backups cannot be decrypted without participation from the nodes themselves. During recovery, after the Recovery Party has met quorum and produced the necessary decryption shares, each node operator applies their Blinder to fully decrypt the backup.

This two-step safeguard ensures that:
• The Recovery Party alone cannot decrypt the root key shares.
• The Lit nodes alone cannot decrypt the backups without the Recovery Party’s participation.
• Only with cooperation from both groups—Recovery Party quorum and node-held Blinders—can the encrypted backups be fully decrypted.

This mechanism preserves the system’s threshold security guarantees, even in the context of sensitive operations like key recovery.

## Encrypting the Backups

The process for encrypting the root key backups involves:

1. The nodes generate a public encryption key and the corresponding private decryption key shares using Distributed Key Generation (DKG) and provide each Recovery Party member with a decryption key share which is a private key share corresponding to the encryption key.
2. This public key is used for encrypting the root keys to generate the backups.
3. Each node generates a Blinder, which is used to apply an additional encryption layer to its backup.
4. The encrypted backups are stored securely by the Lit Protocol development company.

## Recovery Process

If the network needs to be restored:

1. Node operators spin up a new node environment and input their Blinder and encrypted backup. The nodes start waiting for decryption shares from the Recovery Party members.
2. Each Recovery Party member produces a decryption share for each root key share by combining the root key share's ciphertext with their own decryption key share. Then each Recovery Party member uploads the decryption shares they generated to the nodes. (Note that decryption shares are produced by and different from decryption key shares).
3. Each node receives such decryption shares from the Recovery Party members for each encrypted root key share that it holds. The decryption key shares a node received for a root key share are combined above the threshold, combined with the Blinder, to fully decrypt the ciphertext in the backups. Recovery, therefore, requires participation of ⅔ of the Recovery Party, ⅔ of the node operators, and ⅔ of the encrypted backups.
3. With the decrypted root key shares in the new node environment, the network can be restored.
