import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { LoginDto, RegistrationDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ----------------  login  ---------------- */
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() data: LoginDto) {
    // get user with database and check or user is exist
    const findUser = await this.authService.findUserByLogin(data.login);
    if (!findUser) throw new BadRequestException('Invalid user or password');

    // check user password
    const checkPassword = await this.authService.checkPassword({
      getPassword: data.password,
      userPassword: findUser.password,
    });
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate user token
    const token = this.authService.generateJwt({ userId: findUser.id });

    return token;
  }

  /* ----------------  registration  ---------------- */
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    // get user with database and check or user is exist
    const res = await this.authService.findUserByLogin(data.login);
    if (res) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await this.authService.generatePasswordHash(data.password);

    // create user in database
    await this.authService.createUserInDatabase({
      name: data.name,
      login: data.login,
      password: passwordHash,
    });

    return { message: 'User is create' };
  }
}
