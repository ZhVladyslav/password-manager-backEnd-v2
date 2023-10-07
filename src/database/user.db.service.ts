import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { IUser } from 'src/types/user.type';

interface IFindByLogin extends Pick<IUser, 'login'> {}
interface IFindById extends Pick<IUser, 'id'> {}
interface ICreate extends Pick<IUser, 'name' | 'login' | 'password'> {}
interface IUpdateName extends Pick<IUser, 'id' | 'name'> {}
interface IUpdatePassword extends Pick<IUser, 'id' | 'password'> {}
interface IUpdateRole extends Pick<IUser, 'id' | 'roleId'> {}
interface IDelete extends Pick<IUser, 'id'> {}

interface IUserDbService {
  findByLogin(data: IFindByLogin): Promise<IUser>;
  findById(data: IFindById): Promise<IUser>;
  create(data: ICreate): Promise<IUser>;
  updateName(data: IUpdateName): Promise<IUser>;
  updatePassword(data: IUpdatePassword): Promise<IUser>;
  updateRole(data: IUpdateRole): Promise<IUser>;
  delete(data: IDelete): Promise<void>;
}

@Injectable()
export class UserDbService implements IUserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findByLogin({ login }: IFindByLogin): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.findFirst({
        where: { login },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async findById({ id }: IFindById): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.findFirst({
        where: { id },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async create({ name, login, password }: ICreate): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.create({
        data: { name, login, password },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async updateName({ id, name }: IUpdateName): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.update({
        where: { id },
        data: { name },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async updatePassword({ id, password }: IUpdatePassword): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.update({
        where: { id },
        data: { password },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async updateRole({ id, roleId }: IUpdateRole): Promise<IUser> {
    const user = await handlerErrorDb(
      this.databaseService.user.update({
        where: { id },
        data: { roleId },
      }),
    );
    if (!user) return null;
    return user;
  }

  public async delete({ id }: IDelete): Promise<void> {
    const user = await handlerErrorDb(
      this.databaseService.user.delete({
        where: { id },
      }),
    )
  }
}
