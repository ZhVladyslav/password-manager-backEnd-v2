import { Body, Controller, Post, UsePipes, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { rsa } from 'src/utils/rsa';
import { aes } from 'src/utils/aes';
import { DecryptGuard } from 'src/guards/decrypt.guard';

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
  @UseGuards(DecryptGuard)
  async getCryptInfo(@Req() req: { login: string; password: string }) {
    return req['decryptedData'];
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
