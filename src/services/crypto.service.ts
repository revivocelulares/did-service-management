import tweetnacl from 'tweetnacl';
import { DIDKeyPair } from '../types/did.js';
import crypto from 'crypto';

export class CryptoService {
  private static readonly ENCRYPTION_KEY = crypto
    .createHash('sha256')
    .update(process.env.ENCRYPTION_KEY || 'your-secure-encryption-key-min-32-chars!!')
    .digest();
  private static readonly ALGORITHM = 'aes-256-gcm';

  static generateKeyPair(): DIDKeyPair {
    const keyPair = tweetnacl.sign.keyPair();
    return {
      publicKey: Buffer.from(keyPair.publicKey),
      privateKey: Buffer.from(keyPair.secretKey)
    };
  }

  static sign(message: Buffer, privateKey: Buffer): Buffer {
    const signature = tweetnacl.sign.detached(
      message,
      privateKey
    );
    return Buffer.from(signature);
  }

  static verify(message: Buffer, signature: Buffer, publicKey: Buffer): boolean {
    return tweetnacl.sign.detached.verify(
      message,
      signature,
      publicKey
    );
  }

  static encryptPrivateKey(privateKey: Buffer): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(
      this.ALGORITHM,
      this.ENCRYPTION_KEY,
      iv
    );
    
    const encrypted = Buffer.concat([
      cipher.update(privateKey),
      cipher.final()
    ]);

    const authTag = cipher.getAuthTag();
    
    return Buffer.concat([iv, authTag, encrypted]).toString('base64');
  }

  static decryptPrivateKey(encryptedData: string): Buffer {
    const data = Buffer.from(encryptedData, 'base64');
    const iv = data.slice(0, 12);
    const authTag = data.slice(12, 28);
    const encryptedPrivateKey = data.slice(28);

    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      this.ENCRYPTION_KEY,
      iv
    );
    
    decipher.setAuthTag(authTag);
    
    return Buffer.concat([
      decipher.update(encryptedPrivateKey),
      decipher.final()
    ]);
  }
}