import { Injectable, BadRequestException } from '@nestjs/common';
import { password as passCheck } from '../../utils/password';
import { UserDbService } from './user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IDeleteReq, IEditNameReq, IEditPasswordReq, IEditRoleReq, IGetByIdReq, IGetByIdRes } from './user.type';

interface IUserService {
  myAccount(data: IGetByIdReq): Promise<IGetByIdRes>;
  editName(data: IEditNameReq): Promise<IMessageRes>;
  editPassword(data: IEditPasswordReq): Promise<IMessageRes>;
  delete(data: IDeleteReq): Promise<IMessageRes>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly databaseService: UserDbService) {}

  async myAccount({ id }: IGetByIdReq): Promise<IGetByIdRes> {
    const user = await this.databaseService.findById({ id });

    return { id: user.id, name: user.name, roleId: user.roleId };
  }

  async editName({ id, name }: IEditNameReq): Promise<IMessageRes> {
    const user = await this.databaseService.findById({ id });

    if (user.name === name) throw new BadRequestException('This name is already set');

    await this.databaseService.editName({ id, name });

    return { message: 'Name is edit' };
  }

  async editPassword({ id, password, newPassword }: IEditPasswordReq): Promise<IMessageRes> {
    const user = await this.databaseService.findById({ id });
    const passwordIsAccess = await passCheck.verify(password, user.password);

    if (!passwordIsAccess) throw new BadRequestException('The password is not correct');
    if (password === newPassword) throw new BadRequestException('The password is already set');

    const newPasswordHash = await passCheck.generateHash(newPassword);
    await this.databaseService.editPassword({ id, newPassword: newPasswordHash });

    return { message: 'Password is edit' };
  }

  // public async editRole({ id, roleId }: IEditRoleReq): Promise<IMessageRes> {
  //   const user = await this.databaseService.findById({ id });

  //   if (user.roleId === roleId) throw new BadRequestException('This role is already set');

  //   await this.databaseService.editRole({ id, roleId });

  //   return { message: 'User role is edit' };
  // }

  async delete({ id, password }: IDeleteReq): Promise<IMessageRes> {
    const user = await this.databaseService.findById({ id });

    if (!(await passCheck.verify(password, user.password)))
      throw new BadRequestException('The password is not correct');

    await this.databaseService.delete({ id });

    return { message: 'User is delete' };
  }
}
