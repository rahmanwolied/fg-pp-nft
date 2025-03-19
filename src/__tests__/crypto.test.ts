import { describe, it, expect } from 'vitest';
import { Buffer } from 'node:buffer';
import {
  encryptText,
  decryptText,
  encryptFile,
  decryptFile,
  EncryptedData
} from '../lib/crypto';

describe('Text Encryption/Decryption', () => {
  it('should encrypt and decrypt text successfully', () => {
    const originalText = 'Hello, World!';
    const encrypted = encryptText(originalText);
    const decrypted = decryptText(encrypted);

    expect(decrypted).toBe(originalText);
  });

  it('should handle empty string', () => {
    const originalText = '';
    const encrypted = encryptText(originalText);
    const decrypted = decryptText(encrypted);

    expect(decrypted).toBe(originalText);
  });

  it('should handle special characters', () => {
    const originalText = '!@#$%^&*()_+-=[]{}|;:,.<>?`~™️🎉';
    const encrypted = encryptText(originalText);
    const decrypted = decryptText(encrypted);

    expect(decrypted).toBe(originalText);
  });

  it('should handle long text', () => {
    const originalText = 'a'.repeat(10000);
    const encrypted = encryptText(originalText);
    const decrypted = decryptText(encrypted);

    expect(decrypted).toBe(originalText);
  });

  it('should produce encrypted data in correct format', () => {
    const encrypted = encryptText('test');

    expect(encrypted).toHaveProperty('encryptedContent');
    expect(encrypted).toHaveProperty('iv');
    expect(encrypted).toHaveProperty('authTag');
    expect(encrypted).toHaveProperty('salt');
    expect(encrypted).toHaveProperty('key');

    // Check if all properties are base64 encoded strings
    Object.values(encrypted).forEach(value => {
      expect(() => Buffer.from(value, 'base64')).not.toThrow();
    });
  });
});

describe('File Encryption/Decryption', () => {
  it('should encrypt and decrypt file buffer successfully', () => {
    const originalBuffer = Buffer.from('Hello, World!');
    const encrypted = encryptFile(originalBuffer);
    const decrypted = decryptFile(encrypted);

    expect(Buffer.compare(decrypted, originalBuffer)).toBe(0);
  });

  it('should handle empty buffer', () => {
    const originalBuffer = Buffer.alloc(0);
    const encrypted = encryptFile(originalBuffer);
    const decrypted = decryptFile(encrypted);

    expect(Buffer.compare(decrypted, originalBuffer)).toBe(0);
  });

  it('should handle large file buffer', () => {
    const originalBuffer = Buffer.alloc(1024 * 1024); // 1MB buffer
    originalBuffer.fill('x');
    
    const encrypted = encryptFile(originalBuffer);
    const decrypted = decryptFile(encrypted);

    expect(Buffer.compare(decrypted, originalBuffer)).toBe(0);
  });

  it('should handle binary data', () => {
    const originalBuffer = Buffer.from([0xFF, 0x00, 0xFF, 0x00]);
    const encrypted = encryptFile(originalBuffer);
    const decrypted = decryptFile(encrypted);

    expect(Buffer.compare(decrypted, originalBuffer)).toBe(0);
  });

  it('should produce encrypted file data in correct format', () => {
    const encrypted = encryptFile(Buffer.from('test'));

    expect(encrypted).toHaveProperty('encryptedContent');
    expect(encrypted).toHaveProperty('iv');
    expect(encrypted).toHaveProperty('authTag');
    expect(encrypted).toHaveProperty('salt');
    expect(encrypted).toHaveProperty('key');

    // Check if all properties are base64 encoded strings
    Object.values(encrypted).forEach(value => {
      expect(() => Buffer.from(value, 'base64')).not.toThrow();
    });
  });
});

describe('Error Handling', () => {
  it('should throw error when decrypting with invalid key', () => {
    const encrypted = encryptText('test');
    const invalidData: EncryptedData = {
      ...encrypted,
      key: Buffer.from('invalid-key').toString('base64')
    };

    expect(() => decryptText(invalidData)).toThrow();
  });

  it('should throw error when decrypting with invalid IV', () => {
    const encrypted = encryptText('test');
    const invalidData: EncryptedData = {
      ...encrypted,
      iv: Buffer.from('invalid-iv').toString('base64')
    };

    expect(() => decryptText(invalidData)).toThrow();
  });

  it('should throw error when decrypting with invalid auth tag', () => {
    const encrypted = encryptText('test');
    const invalidData: EncryptedData = {
      ...encrypted,
      authTag: Buffer.from('invalid-auth-tag').toString('base64')
    };

    expect(() => decryptText(invalidData)).toThrow();
  });
}); 