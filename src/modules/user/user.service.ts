import { Injectable, BadRequestException } from '@nestjs/common';
import { password as passCheck } from '../../utils/password';
import { IUser, UserDbService } from './user.db.service';

// REQ
interface IFindByIdReq extends Pick<IUser, 'id'> {}
interface IEditNameReq extends Pick<IUser, 'id' | 'name'> {}
interface IEditPasswordReq extends Pick<IUser, 'id' | 'password'> {
  newPassword: string;
}
interface IEditRoleReq extends Pick<IUser, 'id' | 'roleId'> {}
interface IDeleteReq extends Pick<IUser, 'id' | 'password'> {}

// RES
export interface IFindByIdRes extends Pick<IUser, 'id' | 'name' | 'roleId'> {}
export interface IRes {
  message: string;
}

// SERVICE

@Injectable()
export class UserService {
  constructor(private readonly databaseService: UserDbService) {}

  /* ----------------  GET  ---------------- */

  async myAccount({ id }: IFindByIdReq): Promise<IFindByIdRes> {
    const user = await this.databaseService.findUserById({ id });

    return { id: user.id, name: user.name, roleId: user.roleId };
  }

  /* ----------------  PUT  ---------------- */

  // edit name
  async editName({ id, name }: IEditNameReq): Promise<IRes> {
    const user = await this.databaseService.findUserById({ id });

    if (user.name === name) throw new BadRequestException('Error edit user name');

    await this.databaseService.editName({ id, name });

    return { message: 'Name is edit' };
  }

  // edit password
  async editPassword({ id, password, newPassword }: IEditPasswordReq): Promise<IRes> {
    const user = await this.databaseService.findUserById({ id });

    // check user password
    if (!(await passCheck.verify(password, user.password)))
      throw new BadRequestException('The password is not correct');
    if (!(await passCheck.verify(password, newPassword)))
      throw new BadRequestException('The password is already set');

    await this.databaseService.editPassword({ id, password, newPassword });

    return { message: 'Password is edit' };
  }

  // user role edit
  public async editRole({ id, roleId }: IEditRoleReq): Promise<IRes> {
    const user = await this.databaseService.findUserById({ id });

    if (user.roleId === roleId) throw new BadRequestException('This role is already set');

    await this.databaseService.editRole({ id, roleId });

    return { message: 'user role is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  async delete({ id, password }: IDeleteReq): Promise<IRes> {
    const user = await this.databaseService.findUserById({ id });

    if (!(await passCheck.verify(password, user.password)))
      throw new BadRequestException('The password is not correct');

    await this.databaseService.delete({ id });

    return { message: 'User is delete' };
  }
}
