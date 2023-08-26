import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { DecryptGuard } from 'src/guards/decrypt.guard';
import { DecryptRequest } from 'src/decorators/decryptRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @UsePipes(new ValidationPipe())
  @Post('login')
  @UseGuards(DecryptGuard)
  async login(@DecryptRequest() data: LoginDto) {
    return await this.authService.login(data);
  }

  // REGISTRATION
  @UsePipes(new ValidationPipe())
  @Post('registration')
  @UseGuards(DecryptGuard)
  async registration(@DecryptRequest() data: RegistrationDto) {
    return await this.authService.registration(data);
  }
}
