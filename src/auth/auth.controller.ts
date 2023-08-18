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
import { AuthUuidService } from './auth.uuid.service';
import { AuthPasswordService } from './auth.password.service';
import { AuthDatabaseService } from './auth.database.service';
import { AuthJwtService } from './auth.jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUuidService: AuthUuidService,
    private readonly authJwtService: AuthJwtService,
    private readonly authPasswordService: AuthPasswordService,
    private readonly authDatabaseService: AuthDatabaseService,
  ) {}

  /* ----------------  login  ---------------- */
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() data: LoginDto) {
    // get user with database and check or user is exist
    const findUser = await this.authDatabaseService.findUserByLogin(data.login);
    if (!findUser) throw new BadRequestException('Invalid user or password');

    // check user password
    const checkPassword = await this.authPasswordService.checkPassword({
      getPassword: data.password,
      userPassword: findUser.password,
    });
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate session id
    const tokenId = this.authUuidService.generateUuid();

    // generate user token
    const token = this.authJwtService.generateJwt({ userId: findUser.id, tokenId });

    return token;
  }

  /* ----------------  registration  ---------------- */
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    // get user with database and check or user is exist
    const res = await this.authDatabaseService.findUserByLogin(data.login);
    if (res) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await this.authPasswordService.generatePasswordHash(data.password);

    // create user in database
    await this.authDatabaseService.createUserInDatabase({
      name: data.name,
      login: data.login,
      password: passwordHash,
    });

    return { message: 'User is create' };
  }
}
