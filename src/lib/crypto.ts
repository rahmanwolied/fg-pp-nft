import { Buffer } from "node:buffer";
import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32; // 256 bits

export interface EncryptionKeys {
  authTag: string; // Base64 encoded
  iv: string; // Base64 encoded
  salt: string; // Base64 encoded
  key: string; // Base64 encoded
}

export interface EncryptedData {
  encryptedContent: string; // Base64 encoded
  iv: string; // Base64 encoded
  authTag: string; // Base64 encoded
  salt: string; // Base64 encoded
  key: string; // Base64 encoded
}

/**
 * Represents encrypted data with a separate encryption key
 */
export interface EncryptedDataWithKey {
  encryptedContent: string; // Base64 encoded
  iv: string; // Base64 encoded
  authTag: string; // Base64 encoded
  key: string; // Base64 encoded - this is what will be protected by Lit Protocol
}

/**
 * Derives an encryption key from a password using PBKDF2
 */
const deriveKey = (): Buffer => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const password = crypto.randomBytes(32).toString("base64");

  return crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, "sha256");
};

/**
 * Encrypts text content using AES-256-GCM
 */
export const encryptText = (text: string): EncryptedData => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: btoa(String.fromCharCode(...encrypted)),
    iv: btoa(String.fromCharCode(...iv)),
    salt: btoa(String.fromCharCode(...salt)),
    key: btoa(String.fromCharCode(...key)),
    authTag: btoa(String.fromCharCode(...authTag)),
  };
};

/**
 * Decrypts text content using AES-256-GCM
 */
export const decryptText = (encryptedData: EncryptedData): string => {
  const { encryptedContent, iv, authTag, key } = encryptedData;

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

/**
 * Encrypts binary file data using AES-256-GCM
 */
export const encryptFile = (fileBuffer: Buffer): EncryptedData => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: btoa(String.fromCharCode(...encrypted)),
    iv: btoa(String.fromCharCode(...iv)),
    authTag: btoa(String.fromCharCode(...authTag)),
    salt: btoa(String.fromCharCode(...salt)),
    key: btoa(String.fromCharCode(...key)),
  };
};

/**
 * Decrypts binary file data using AES-256-GCM
 */
export const decryptFile = (encryptedData: EncryptedData): Buffer => {
  const { encryptedContent, iv, authTag, key } = encryptedData;

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, "base64")),
    decipher.final(),
  ]);
};

/**
 * Helper function to convert Uint8Array to base64 string safely
 */
const arrayToBase64 = (array: Uint8Array): string => {
  return btoa(
    Array.from(array)
      .map((byte) => String.fromCharCode(byte))
      .join("")
  );
};

/**
 * Encrypts a File object in the browser using AES-256-GCM
 */
export const encryptFileInBrowser = async (
  file: File
): Promise<EncryptedData> => {
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = window.crypto.getRandomValues(new Uint8Array(KEY_LENGTH));

  const fileBuffer = await file.arrayBuffer();
  const fileArray = new Uint8Array(fileBuffer);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const cipher = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    cryptoKey,
    fileArray
  );

  const encryptedArray = new Uint8Array(cipher);
  const authTag = encryptedArray.slice(-AUTH_TAG_LENGTH);
  const encryptedContent = encryptedArray.slice(0, -AUTH_TAG_LENGTH);

  return {
    encryptedContent: arrayToBase64(encryptedContent),
    iv: arrayToBase64(iv),
    authTag: arrayToBase64(authTag),
    salt: arrayToBase64(salt),
    key: arrayToBase64(key),
  };
};

/**
 * Helper function to convert base64 string back to Uint8Array
 */
const base64ToArray = (base64: string): Uint8Array => {
  // Ensure input is a string
  if (typeof base64 !== "string") {
    console.error("Invalid input to base64ToArray:", base64);
    throw new Error("Input to base64ToArray must be a string");
  }

  try {
    // Clean up the base64 string by removing any potential problematic characters
    const cleanBase64 = base64.trim().replace(/[\n\r\s]/g, "");

    // Add padding if necessary
    const paddingLength = 4 - (cleanBase64.length % 4);
    const paddedBase64 =
      paddingLength < 4 ? cleanBase64 + "=".repeat(paddingLength) : cleanBase64;

    const binaryString = atob(paddedBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    console.error("Problematic base64 string:", base64);
    throw new Error("Invalid base64 encoding");
  }
};

/**
 * Decrypts an encrypted file in the browser using AES-256-GCM
 */
export const decryptFileInBrowser = async (
  encryptedData: EncryptedData
): Promise<Uint8Array> => {
  const { encryptedContent, iv, authTag, key } = encryptedData;

  console.log("decryptFileInBrowser::encryptedData", encryptedData);

  // Convert base64 strings back to Uint8Arrays
  const encryptedArray = base64ToArray(encryptedContent);
  const ivArray = base64ToArray(iv);
  const authTagArray = base64ToArray(authTag);
  const keyArray = base64ToArray(key);

  // Combine encrypted content and auth tag
  const encryptedWithAuthTag = new Uint8Array(
    encryptedArray.length + authTagArray.length
  );
  encryptedWithAuthTag.set(encryptedArray);
  encryptedWithAuthTag.set(authTagArray, encryptedArray.length);

  // Import the key
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyArray,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  // Decrypt the data
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray,
    },
    cryptoKey,
    encryptedWithAuthTag
  );

  return new Uint8Array(decrypted);
};

/**
 * Creates a displayable URL for the decrypted image data
 */
export const displayDecryptedImage = async (
  encryptedData: EncryptedData
): Promise<string> => {
  const decryptedData = await decryptFileInBrowser(encryptedData);

  // Create a blob from the decrypted data
  const blob = new Blob([decryptedData], { type: "image/jpeg" }); // Adjust mime type as needed

  // Create a URL for the blob
  return URL.createObjectURL(blob);
};
