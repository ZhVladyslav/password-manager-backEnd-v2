import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { databaseHandler } from 'src/database/database.handler';
import { LoginDto } from './dto/login.dto';
import { password } from 'src/utils/password';
import { uuid } from 'src/utils/uuid';
import { jwt } from 'src/utils/jwt';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  LOGIN  ---------------- */

  public async login(req: LoginDto) {
    // get user with database and check or user is exist
    const findUser = await this.findUserByLogin(req.login);
    if (!findUser) throw new BadRequestException('Invalid user or password');

    // check user password
    const checkPassword = await password.verify(req.password, findUser.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate token id
    const tokenId = uuid.v4();

    // generate user token
    const token = jwt.generate({ userId: findUser.id, tokenId });

    // create session
    await this.createSession({ userId: findUser.id, tokenId });

    // response
    if (process.env.SETTING_MODE === 'true') return { token, userId: findUser.id };
    return { token };
  }

  /* ----------------  REGISTRATION  ---------------- */

  public async registration(data: RegistrationDto) {
    // get user with database and check or user is exist
    const res = await this.findUserByLogin(data.login);
    if (res) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await password.generateHash(data.password);

    // create user in database
    await this.createUserInDatabase({
      name: data.name,
      login: data.login,
      password: passwordHash,
    });
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  //  Find user by login in database
  private async findUserByLogin(login: string) {
    return await databaseHandler.errors(
      this.databaseService.user.findFirst({
        where: { login },
      }),
    );
  }

  //  create session in database
  private async createSession(data: { userId: string; tokenId: string }) {
    return await databaseHandler.errors(this.databaseService.session.create({ data }));
  }

  // create user in database
  private async createUserInDatabase(data: { name: string; login: string; password: string }) {
    return await databaseHandler.errors(
      this.databaseService.user.create({
        data: {
          name: data.name,
          login: data.login,
          password: data.password,
          roleId: null,
        },
      }),
    );
  }
}
