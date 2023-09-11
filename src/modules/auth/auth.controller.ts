import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto, //
  ) {
    return await this.authService.login(data);
  }

  @Post('registration')
  async registration(
    @Body() data: RegistrationDto, //
  ) {
    return await this.authService.registration(data);
  }
}
