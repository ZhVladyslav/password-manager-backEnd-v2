import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() { login, password }: LoginDto, //
  ) {
    return await this.authService.login({ login, password });
  }

  // REGISTRATION
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(
    @Body() { name, login, password }: RegistrationDto, //
  ) {
    return await this.authService.registration({ name, login, password });
  }
}
