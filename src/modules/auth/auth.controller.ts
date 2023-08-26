import { Body, Controller, Post, UsePipes, ValidationPipe, Response, Get } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { handlers } from 'src/handlers/handlers';
import { rsa } from 'src/utils/rsa';
import { aes } from 'src/utils/aes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  // REGISTRATION
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    return await this.authService.registration(data);
  }

  //
  // SERVER DEMO
  //

  @Get('rsa-key')
  async getKeyRsa() {
    return { rsaKey: rsa.getKey() };
  }

  @Get('crypt-info')
  async getCryptInfo(@Body() body: { iv: string; key: string; data: string }) {
    aes.generateKeys();
    const viDecrypt = Buffer.from(JSON.parse(rsa.decrypt(body.iv)), 'utf-8');
    const keyDecrypt = Buffer.from(JSON.parse(rsa.decrypt(body.key)), 'utf-8');
    aes.setKeys({ key: keyDecrypt, iv: viDecrypt });

    const dataDecrypt = JSON.parse(aes.decrypt(body.data));

    return dataDecrypt;
  }

  //
  // USER DEMO
  //

  @Get('encrypt-rsa-key')
  async encryptRsaKey() {
    aes.generateKeys();
    const aesKeys = aes.getKeys();
    const viEncrypt = rsa.encrypt(JSON.stringify(aesKeys.iv));
    const keyEncrypt = rsa.encrypt(JSON.stringify(aesKeys.aesKey));

    const message = JSON.stringify({ login: 'adasdasdad', password: 'asdasdasdasdsadas' });
    const dataEncrypt = aes.encrypt(message);

    return {
      iv: viEncrypt,
      key: keyEncrypt,
      data: dataEncrypt,
    };
  }
}
