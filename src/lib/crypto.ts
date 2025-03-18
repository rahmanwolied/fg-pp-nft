import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32; // 256 bits

interface EncryptedData {
  encryptedContent: string; // Base64 encoded
  iv: string; // Base64 encoded
  authTag: string; // Base64 encoded
  salt: string; // Base64 encoded
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
const deriveKey = (password: string, salt: Buffer): Buffer => {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
};

/**
 * Encrypts text content using AES-256-GCM
 */
export const encryptText = (text: string, password: string): EncryptedData => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(password, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    salt: salt.toString('base64')
  };
};

/**
 * Decrypts text content using AES-256-GCM
 */
export const decryptText = (encryptedData: EncryptedData, password: string): string => {
  const { encryptedContent, iv, authTag, salt } = encryptedData;
  
  const key = deriveKey(password, Buffer.from(salt, 'base64'));
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'base64'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, 'base64')),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
};

/**
 * Encrypts binary file data using AES-256-GCM
 */
export const encryptFile = (fileBuffer: Buffer, password: string): EncryptedData => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(password, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    salt: salt.toString('base64')
  };
};

/**
 * Decrypts binary file data using AES-256-GCM
 */
export const decryptFile = (encryptedData: EncryptedData, password: string): Buffer => {
  const { encryptedContent, iv, authTag, salt } = encryptedData;
  
  const key = deriveKey(password, Buffer.from(salt, 'base64'));
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'base64'));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, 'base64')),
    decipher.final()
  ]);
};

/**
 * Encrypts text content using AES-256-GCM with a randomly generated key
 * Returns both the encrypted data and the key that was used
 */
export const encryptTextWithRandomKey = (text: string): EncryptedDataWithKey => {
  const key = crypto.randomBytes(KEY_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    key: key.toString('base64')
  };
};

/**
 * Decrypts text content using AES-256-GCM with the provided key
 */
export const decryptTextWithKey = (encryptedData: EncryptedDataWithKey): string => {
  const { encryptedContent, iv, authTag, key } = encryptedData;
  
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'base64'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, 'base64')),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
};

/**
 * Encrypts file data using AES-256-GCM with a randomly generated key
 * Returns both the encrypted data and the key that was used
 */
export const encryptFileWithRandomKey = (fileBuffer: Buffer): EncryptedDataWithKey => {
  const key = crypto.randomBytes(KEY_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    key: key.toString('base64')
  };
};

/**
 * Decrypts file data using AES-256-GCM with the provided key
 */
export const decryptFileWithKey = (encryptedData: EncryptedDataWithKey): Buffer => {
  const { encryptedContent, iv, authTag, key } = encryptedData;
  
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'base64'));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedContent, 'base64')),
    decipher.final()
  ]);
};
