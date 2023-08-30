import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';
import { ISession } from 'src/types/session.type';
import { IUser } from 'src/types/user.type';

interface IFindByLoginReq extends Pick<IUser, 'login'> {}
interface ICreateReq extends Pick<IUser, 'name' | 'login' | 'password'> {}
interface ICreateSession extends Pick<ISession, 'userId' | 'tokenId'> {}
interface IFindByLoginRes extends Pick<IUser, 'id' | 'login' | 'password'> {}


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
  public async createSession({ tokenId, userId }: ICreateSession): Promise<void> {
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
