import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface ISession {
  userId: string;
  tokenId: string;
}

// REQ
interface IFindByLoginReq extends Pick<IUser, 'login'> {}
interface ICreateReq extends Pick<IUser, 'name' | 'login' | 'password'> {}

// RES
interface IFindByLoginRes extends Pick<IUser, 'id' | 'login' | 'password'> {}

// SERVICE

@Injectable()
export class AuthDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  //  Find user by login in database
  public async findByLogin({ login }: IFindByLoginReq): Promise<IFindByLoginRes> {
    if (!login) throw new BadRequestException();

    const user = await handlers.dbError(
      this.databaseService.user.findFirst({
        where: { login },
      }),
    );

    return { id: user.id, login: user.login, password: user.password };
  }

  //  create session in database
  public async createSession({ tokenId, userId }: ISession): Promise<void> {
    if (!tokenId || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.session.create({
        data: { tokenId, userId },
      }),
    );
  }

  // create user in database
  public async create({ login, name, password }: ICreateReq): Promise<void> {
    if (!login || !name || !password) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.user.create({
        data: { login, name, password, roleId: null },
      }),
    );
  }
}
