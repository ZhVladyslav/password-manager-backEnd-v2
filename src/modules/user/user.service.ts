import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IUser } from 'src/types/user.type';
import { passCheck } from 'src/utils/password';

interface IService {
  id: string;
  name: string;
  password: string;
  roleId: string;
}

interface IMyAccount extends Pick<IService, 'id'> {}
interface IEditName extends Pick<IService, 'id' | 'name'> {}
interface IEditPassword extends Pick<IService, 'id' | 'password'> {
  newPassword: string;
}
interface IEditRole extends Pick<IService, 'id' | 'roleId'> {}
interface IDelete extends Pick<IService, 'id' | 'password'> {}

interface IUserService {
  myAccount(data: IMyAccount): Promise<IUser>;
  editName(data: IEditName): Promise<{ message: string }>;
  editPassword(data: IEditPassword): Promise<{ message: string }>;
  editRole(data: IEditRole): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userDbService: UserDbService) {}

  public async myAccount({ id }: IMyAccount): Promise<IUser> {
    const userInDb = await this.userDbService.findById({ id });
    return userInDb;
  }

  public async editName({ id, name }: IEditName) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new BadRequestException('User is not found');
    if (userInDb.name === name) throw new BadRequestException('This name already set');

    await this.userDbService.updateName({ id, name });

    return { message: 'User name is edit' };
  }

  public async editPassword({ id, password, newPassword }: IEditPassword) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new BadRequestException('User is not found');

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');
    if (password === newPassword) throw new BadRequestException('This password already is set');

    const newEncryptPassword = await passCheck.generateHash(newPassword);
    await this.userDbService.updatePassword({ id, password: newEncryptPassword });

    return { message: 'User password is edit' };
  }

  public async editRole({ id, roleId }: IEditRole): Promise<IMessageRes> {
    const user = await this.userDbService.findById({ id });
    if (!user) throw new BadRequestException('User is not  found');

    if (user.roleId === roleId) throw new BadRequestException('This role is already set');

    await this.userDbService.updateRole({ id, roleId });

    return { message: 'User role is edit' };
  }

  public async delete({ id, password }: IDelete) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new BadRequestException('User is not found');

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');

    await this.userDbService.delete({ id });

    return { message: 'User is delete' };
  }
}
