import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { ICreateSessionReq, ICreateUserReq, IGetByLoginReq, IGetByLoginRes } from './auth.type';

interface IAuthDbService {
  findByLogin(data: IGetByLoginReq): Promise<IGetByLoginRes>;
  createSession(data: ICreateSessionReq): Promise<void>;
  createUser(data: ICreateUserReq): Promise<void>;
}

@Injectable()
export class AuthDbService implements IAuthDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findByLogin({ login }: IGetByLoginReq): Promise<IGetByLoginRes> {
    const user = await handlerErrorDb(this.databaseService.user.findFirst({ where: { login } }));
    if (!user) return null;
    return { id: user.id, login: user.login, password: user.password };
  }

  public async createSession({ tokenId, userId }: ICreateSessionReq): Promise<void> {
    await handlerErrorDb(this.databaseService.session.create({ data: { tokenId, userId } }));
  }

  public async createUser({ login, name, password }: ICreateUserReq): Promise<void> {
    await handlerErrorDb(this.databaseService.user.create({ data: { login, name, password, roleId: null } }));
  }
}
