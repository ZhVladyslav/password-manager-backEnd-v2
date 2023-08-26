import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DecryptGuard } from 'src/guards/decrypt.guard';
import { SettingsGuard } from 'src/guards/settings.guard';
import { aes } from 'src/utils/aes';
import { rsa } from 'src/utils/rsa';

@Controller('decrypt')
export class DecryptController {
  @Get('rsa-key')
  async getKeyRsa() {
    return { rsaKey: rsa.getKey() };
  }

  // @Get('crypt-info')
  // @UseGuards(DecryptGuard)
  // async getCryptInfo(@Req() req: { login: string; password: string }) {
  //   return req['decryptedData'];
  // }

  //
  // USER DEMO
  //

  @Get('encrypt-rsa-key')
  @UseGuards(SettingsGuard)
  async encryptRsaKey() {
    aes.generateKeys();
    const aesKeys = aes.getKeys();
    const viEncrypt = rsa.encrypt(JSON.stringify(aesKeys.iv));
    const keyEncrypt = rsa.encrypt(JSON.stringify(aesKeys.aesKey));

    const message = JSON.stringify({ login: 'DemoFirst', password: 'Sfdsfjhgbfdjb', date: Date.now() });
    const dataEncrypt = aes.encrypt(message);

    return {
      iv: viEncrypt,
      key: keyEncrypt,
      data: dataEncrypt,
    };
  }
}
