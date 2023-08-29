import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { handlers } from 'src/handlers/handlers';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  roleId: string | null;
}

// REQ
interface IFindByIdReq extends Pick<IUser, 'id'> {}
interface IEditNameReq extends Pick<IUser, 'id' | 'name'> {}
interface IEditPasswordReq extends Pick<IUser, 'id' | 'password'> {
  newPassword: string;
}
interface IEditRoleReq extends Pick<IUser, 'id' | 'roleId'> {}
interface IDeleteReq extends Pick<IUser, 'id'> {}

// RES
interface IFindByIdRes extends IUser {}

// SERVICE

@Injectable()
export class UserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  // find user by id
  public async findUserById({ id }: IFindByIdReq): Promise<IFindByIdRes> {
    if (!id) throw new BadRequestException();

    const user = await handlers.dbError(this.databaseService.user.findFirst({ where: { id } }));

    if (id === user.id) return user;

    return null;
  }

  // edit user name
  public async editName({ id, name }: IEditNameReq): Promise<void> {
    if (!id || !name) throw new BadRequestException();

    await handlers.dbError(this.databaseService.user.update({ where: { id }, data: { name } }));
  }

  public async editPassword({ id, password, newPassword }: IEditPasswordReq): Promise<void> {
    if (!id || !password || !newPassword) throw new BadRequestException();

    await handlers.dbError(this.databaseService.user.update({ where: { id }, data: { password: newPassword } }));
    await handlers.dbError(this.databaseService.session.deleteMany({ where: { userId: id } }));
  }

  public async editRole({ id, roleId }: IEditRoleReq): Promise<void> {
    if (!id) throw new BadRequestException();

    await handlers.dbError(this.databaseService.user.update({ where: { id }, data: { roleId } }));
  }

  public async delete({ id }: IDeleteReq): Promise<void> {
    if (!id) throw new BadRequestException();

    await handlers.dbError(this.databaseService.passCollection.deleteMany({ where: { userId: id } }));
    await handlers.dbError(this.databaseService.session.deleteMany({ where: { userId: id } }));
    await handlers.dbError(this.databaseService.user.delete({ where: { id } }));
  }
}
