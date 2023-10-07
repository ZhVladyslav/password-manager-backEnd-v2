import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IUser } from 'src/types/user.type';
import { passCheck } from 'src/utils/password';
import { SessionService } from '../session/session.service';
import { PassCollectionDbService } from 'src/database/passCollection.db.service';

interface IService {
  id: string;
  name: string;
  password: string;
  roleId: string;
}

interface IById extends Pick<IService, 'id'> {}
interface IEditName extends Pick<IService, 'id' | 'name'> {}
interface IEditPassword extends Pick<IService, 'id' | 'password'> {
  newPassword: string;
}
interface IEditRole extends Pick<IService, 'id' | 'roleId'> {}
interface IDelete extends Pick<IService, 'id' | 'password'> {}

interface IUserService {
  getById(data: IById): Promise<IUser>;
  editName(data: IEditName): Promise<{ message: string }>;
  editPassword(data: IEditPassword): Promise<{ message: string }>;
  editRole(data: IEditRole): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly sessionService: SessionService,
    private readonly passCollectionService: PassCollectionDbService,
  ) {}

  public async getById({ id }: IById): Promise<IUser> {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');
    return userInDb;
  }

  public async editName({ id, name }: IEditName) {
    const userInDb = await this.getById({ id });
    if (userInDb.name === name) throw new BadRequestException('This name already set');

    await this.userDbService.updateName({ id, name });

    return { message: 'User name is edit' };
  }

  public async editPassword({ id, password, newPassword }: IEditPassword) {
    const userInDb = await this.getById({ id });

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');
    if (password === newPassword) throw new BadRequestException('This password already is set');

    const newEncryptPassword = await passCheck.generateHash(newPassword);
    await this.userDbService.updatePassword({ id, password: newEncryptPassword });
    await this.sessionService.deleteAll({ userId: id });

    return { message: 'User password is edit' };
  }

  public async editRole({ id, roleId }: IEditRole): Promise<IMessageRes> {
    const userInDb = await this.getById({ id });
    if (userInDb.roleId === roleId) throw new BadRequestException('This role is already set');

    await this.userDbService.updateRole({ id, roleId });

    return { message: 'User role is edit' };
  }

  public async delete({ id, password }: IDelete) {
    const userInDb = await this.getById({ id });

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');

    await this.sessionService.deleteAll({ userId: id });
    await this.passCollectionService.deleteAll({ userId: id });
    await this.userDbService.delete({ id });

    return { message: 'User is delete' };
  }
}
