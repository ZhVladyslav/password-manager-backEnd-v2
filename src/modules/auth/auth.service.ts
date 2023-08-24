import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { password } from 'src/utils/password';
import { uuid } from 'src/utils/uuid';
import { jwt } from 'src/utils/jwt';
import { handlers } from 'src/handlers/handlers';

interface ILogin {
  login: string;
  password: string;
}

interface IRegistration {
  name: string;
  login: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  LOGIN  ---------------- */

  public async login(data: ILogin) {
    // find  user in database and check in user exist
    const userInDb = await this.findUserByLogin(data.login);
    if (!userInDb) throw new BadRequestException('Invalid user or password');

    // check password
    const checkPassword = await password.verify(data.password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate token id
    const tokenId = uuid.v4();

    // generate user token
    const token = jwt.generate({ userId: userInDb.id, tokenId });

    // create session
    await this.createSession({ userId: userInDb.id, tokenId });

    return { token };
  }

  /* ----------------  REGISTRATION  ---------------- */

  public async registration(data: IRegistration) {
    // get user with database and check or user is exist
    const userInDb = await this.findUserByLogin(data.login);
    if (userInDb) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await password.generateHash(data.password);

    // create user in database
    await this.createUserInDatabase({
      name: data.name,
      login: data.login,
      password: passwordHash,
    });

    return { message: 'User is create' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  //  Find user by login in database
  private async findUserByLogin(login: string) {
    if (!login) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.user.findFirst({
        where: { login },
      }),
    );
  }

  //  create session in database
  private async createSession({ tokenId, userId }: { userId: string; tokenId: string }) {
    if (!tokenId || !userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.session.create({
        data: { tokenId, userId },
      }),
    );
  }

  // create user in database
  private async createUserInDatabase({ login, name, password }: { name: string; login: string; password: string }) {
    if (!login || !name || !password) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.user.create({
        data: { login, name, password, roleId: null },
      }),
    );
  }
}
