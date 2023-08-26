import * as crypto from 'crypto';

class AES {
  private aesKey: Buffer;
  private iv: Buffer;

  constructor() {
    this.aesKey = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }

  public generateKeys() {
    this.aesKey = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
    
  }

  public setKeys({ key, iv }: { key: Buffer; iv: Buffer }) {    
    this.aesKey = key;
    this.iv = iv;
  }

  // for demo
  public getKeys() {
    return {
      aesKey: this.aesKey,
      iv: this.iv,
    };
  }

  public encrypt(message: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
    let encryptedMessage = cipher.update(message, 'utf-8', 'base64');
    encryptedMessage += cipher.final('base64');
    return encryptedMessage;
  }

  public decrypt(encryptedMessage: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.aesKey, this.iv);
    let decryptedMessage = decipher.update(encryptedMessage, 'base64', 'utf-8');
    decryptedMessage += decipher.final('utf-8');
    return decryptedMessage;
  }
}

export const aes = new AES();
