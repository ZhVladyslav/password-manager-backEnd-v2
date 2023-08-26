import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

class RSA {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    const { publicKey, privateKey } = this.generateKey();
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  private generateKey() {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        // passphrase: process.env.RSA_PRIVATE_KEY,
      },
    });
  }

  public getKey() {
    return JSON.stringify(this.publicKey);
  }

  public encrypt(message: string) {
    const encryptedBuffer = crypto.publicEncrypt(this.publicKey, Buffer.from(message, 'utf-8'));
    const encryptedMessage = encryptedBuffer.toString('base64');
    return encryptedMessage;
  }

  public decrypt(encryptedMessage: string) {
    try {
      const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
      const decryptedBuffer = crypto.privateDecrypt(
        {
          key: this.privateKey,
          // passphrase: process.env.RSA_PRIVATE_KEY,
        },
        encryptedBuffer,
      );
      const decryptedMessage = decryptedBuffer.toString('utf-8');
      return decryptedMessage;
    }
    catch(err) {
      throw new BadRequestException('Incorrect encrypted data')
    }
  }
}

export const rsa = new RSA();
