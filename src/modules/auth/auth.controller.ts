import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { DecryptRequest } from 'src/decorators/decryptRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@DecryptRequest() data: LoginDto) {
    return await this.authService.login(data);
  }

  // REGISTRATION
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@DecryptRequest() data: RegistrationDto) {
    return await this.authService.registration(data);
  }
}
