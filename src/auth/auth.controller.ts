import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { LoginDto, RegistrationDto } from './auth.dto';
import { AuthService } from './auth.service';
import { jwt } from 'src/config/jwt';
import { password } from 'src/config/password';
import { uuid } from 'src/config/uuid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ----------------------------------------------------------------------

  //
  // LOGIN
  //

  // ----------------------------------------------------------------------

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() data: LoginDto) {
    // get user with database and check or user is exist
    const findUser = await this.authService.findUserByLogin(data.login);
    if (!findUser) throw new BadRequestException('Invalid user or password');

    // check user password
    const checkPassword = await password.verify(data.password, findUser.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate session id
    const tokenId = uuid.v4();

    // generate user token
    const token = jwt.generate({ userId: findUser.id, tokenId });

    // create session
    await this.authService.createSession({ userId: findUser.id, tokenId });

    if (process.env.SETTING_MODE === 'true') return { token, userId: findUser.id };
    return { token };
  }

  // ----------------------------------------------------------------------

  //
  // REGISTRATION
  //

  // ----------------------------------------------------------------------

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    // get user with database and check or user is exist
    const res = await this.authService.findUserByLogin(data.login);
    if (res) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await password.generateHash(data.password);

    // create user in database
    await this.authService.createUserInDatabase({
      name: data.name,
      login: data.login,
      password: passwordHash,
    });

    return { message: 'User is create' };
  }
}
