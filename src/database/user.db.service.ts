import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  IUser,
  IUserDbCreate,
  IUserDbDelete,
  IUserDbFindById,
  IUserDbFindByLogin,
  IUserDbUpdateName,
  IUserDbUpdatePassword,
} from 'src/types/user.type';

interface IUserDbService {
  findByLogin(data: IUserDbFindByLogin): Promise<IUser>;
  findById(data: IUserDbFindById): Promise<IUser>;
  create(data: IUserDbCreate): Promise<IUser>;
  updateName(data: IUserDbUpdateName): Promise<IUser>;
  updatePassword(data: IUserDbUpdatePassword): Promise<IUser>;
  delete(data: IUserDbDelete): Promise<void>;
}

@Injectable()
export class UserDbService implements IUserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IUser[]> {
    const user = await handlerErrorDb(this.databaseService.user.findMany());
    return user;
  }

  public async findByLogin({ login }: IUserDbFindByLogin): Promise<IUser> {
    const user = await handlerErrorDb(this.databaseService.user.findFirst({ where: { login } }));
    return !user ? null : user;
  }

  public async findById({ id }: IUserDbFindById): Promise<IUser> {
    const user = await handlerErrorDb(this.databaseService.user.findFirst({ where: { id } }));
    return !user ? null : user;
  }

  public async create({ name, login, password }: IUserDbCreate): Promise<IUser> {
    const user = await handlerErrorDb(this.databaseService.user.create({ data: { name, login, password } }));
    return !user ? null : user;
  }

  public async updateName({ id, name }: IUserDbUpdateName): Promise<IUser> {
    const user = await handlerErrorDb(this.databaseService.user.update({ where: { id }, data: { name } }));
    return !user ? null : user;
  }

  public async updatePassword({ id, password }: IUserDbUpdatePassword): Promise<IUser> {
    const user = await handlerErrorDb(this.databaseService.user.update({ where: { id }, data: { password } }));
    return !user ? null : user;
  }

  public async delete({ id }: IUserDbDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.user.delete({ where: { id } }));
  }
}
