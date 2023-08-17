import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegistrationDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() data: LoginDto) {
    const res = await this.authService.login(data)
    return res
  }

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    const res = await this.authService.registration(data)
    return res
  }

  @Get('view')
  async view() {
    const res = await this.authService.view()
    return res
  }
}
