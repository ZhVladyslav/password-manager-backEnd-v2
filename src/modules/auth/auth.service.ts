import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { password as passCheck } from 'src/utils/password';
import { uuid } from 'src/utils/uuid';
import { jwt } from 'src/utils/jwt';
import { handlers } from 'src/handlers/handlers';

interface IUserRequest {
  name: string;
  login: string;
  password: string;
}

interface IUserResponse {
  token: string;
  message: string;
}

interface ISessionResponse {
  tokenId: string;
  userId: string;
}

// LOGIN
interface ILoginReq extends Omit<IUserRequest, 'name'> {}
export interface ILoginRes extends Omit<IUserResponse, 'message'> {}

interface ILoginReqDb extends Omit<IUserRequest, 'name' | 'password'> {}
export interface ILoginResDb extends Omit<IUserRequest, 'name'> {
  id: string;
}

// REGISTRATION
interface IRegistrationReq extends IUserRequest {}
export interface IRegistrationRes extends Omit<IUserResponse, 'token'> {}

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  LOGIN  ---------------- */

  public async login({ login, password }: ILoginReq): Promise<ILoginRes> {
    // find  user in database and check in user exist
    const userInDb = await this.findUserByLogin({ login });
    if (!userInDb) throw new BadRequestException('Invalid user or password');

    // check password
    const checkPassword = await passCheck.verify(password, userInDb.password);
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

  public async registration({ name, login, password }: IRegistrationReq): Promise<IRegistrationRes> {
    // get user with database and check or user is exist
    const userInDb = await this.findUserByLogin({ login });
    if (userInDb) throw new ConflictException('User with this login already exists.');

    // generate user password hash
    const passwordHash = await passCheck.generateHash(password);

    // create user in database
    await this.createUserInDatabase({ name, login, password: passwordHash });

    return { message: 'User is create' };
  }

  /** 
  
  // ----------------------------------------------------------------------

  private methods
   
  // ----------------------------------------------------------------------

  */

  //  Find user by login in database
  private async findUserByLogin({ login }: ILoginReqDb): Promise<ILoginResDb> {
    if (!login) throw new BadRequestException();

    const user = await handlers.dbError(
      this.databaseService.user.findFirst({
        where: { login },
      }),
    );

    return { id: user.id, login: user.login, password: user.password };
  }

  //  create session in database
  private async createSession({ tokenId, userId }: ISessionResponse): Promise<void> {
    if (!tokenId || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.session.create({
        data: { tokenId, userId },
      }),
    );
  }

  // create user in database
  private async createUserInDatabase({ login, name, password }: IRegistrationReq): Promise<void> {
    if (!login || !name || !password) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.user.create({
        data: { login, name, password, roleId: null },
      }),
    );
  }
}
