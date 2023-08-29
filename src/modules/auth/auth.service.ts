import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { password as passCheck } from 'src/utils/password';
import { uuid } from 'src/utils/uuid';
import { jwt } from 'src/utils/jwt';
import { AuthDbService, IUser } from './auth.db.service';

// REQ
interface ILoginReq extends Pick<IUser, 'login' | 'password'> {}
interface IRegistrationReq extends Pick<IUser, 'name' | 'login' | 'password'> {}

// RES
export interface ILoginRes {
  token: string;
}
export interface IRegistrationRes {
  message: string;
}

// SERVICE

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: AuthDbService) {}

  /* ----------------  LOGIN  ---------------- */

  public async login({ login, password }: ILoginReq): Promise<ILoginRes> {
    // find  user in database and check in user exist
    const userInDb = await this.databaseService.findByLogin({ login });
    if (!userInDb) throw new BadRequestException('Invalid user or password');

    // check password
    const checkPassword = await passCheck.verify(password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    // generate token id
    const tokenId = uuid.v4();

    // generate user token
    const token = jwt.generate({ userId: userInDb.id, tokenId });

    // create session
    await this.databaseService.createSession({ userId: userInDb.id, tokenId });

    return { token };
  }

  /* ----------------  REGISTRATION  ---------------- */

  public async registration({ name, login, password }: IRegistrationReq): Promise<IRegistrationRes> {
    // get user with database and check or user is exist
    const userInDb = await this.databaseService.findByLogin({ login });
    if (userInDb) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await passCheck.generateHash(password);

    // create user in database
    await this.databaseService.create({ name, login, password: passwordHash });

    return { message: 'User is create' };
  }
}
