import { Body, Controller, Post, UsePipes, ValidationPipe, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { handlers } from 'src/handlers/handlers';

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
}
