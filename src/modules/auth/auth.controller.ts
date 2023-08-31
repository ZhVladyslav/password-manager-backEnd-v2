import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { checkReg } from 'src/utils/checkReg';
import { regexConfig } from 'src/config/reg';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() { login, password }: LoginDto, //
  ) {
    checkReg(regexConfig.user.login, 'login', login);
    checkReg(regexConfig.user.password, 'password', password);
    return await this.authService.login({ login, password });
  }

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(
    @Body() { name, login, password }: RegistrationDto, //
  ) {
    checkReg(regexConfig.user.name, 'name', name);
    checkReg(regexConfig.user.login, 'login', login);
    checkReg(regexConfig.user.password, 'password', password);
    return await this.authService.registration({ name, login, password });
  }
}
