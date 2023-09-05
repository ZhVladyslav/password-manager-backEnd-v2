import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IDeleteReqDb, IEditNameReq, IEditPasswordReqDb, IEditRoleReq, IGetByIdReq, IGetByIdResDb } from './user.type';

interface IUserDbService {
  findById(data: IGetByIdReq): Promise<IGetByIdResDb>;
  editName(data: IEditNameReq): Promise<void>;
  editPassword(data: IEditPasswordReqDb): Promise<void>;
  editRole(data: IEditRoleReq): Promise<void>;
  delete(data: IDeleteReqDb): Promise<void>;
}

@Injectable()
export class UserDbService implements IUserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findById({ id }: IGetByIdReq): Promise<IGetByIdResDb> {
    const user = await handlerErrorDb(this.databaseService.user.findFirst({ where: { id } }));
    if (!user) throw new BadRequestException('User is not found');
    return user;
  }

  public async editName({ id, name }: IEditNameReq): Promise<void> {
    await this.findById({ id });
    await handlerErrorDb(this.databaseService.user.update({ where: { id }, data: { name } }));
  }

  public async editPassword({ id, newPassword }: IEditPasswordReqDb): Promise<void> {
    await handlerErrorDb(this.databaseService.user.update({ where: { id }, data: { password: newPassword } }));
    await handlerErrorDb(this.databaseService.session.deleteMany({ where: { userId: id } }));
  }

  public async editRole({ id, roleId }: IEditRoleReq): Promise<void> {
    await handlerErrorDb(this.databaseService.user.update({ where: { id }, data: { roleId } }));
  }

  public async delete({ id }: IDeleteReqDb): Promise<void> {
    await handlerErrorDb(this.databaseService.passCollection.deleteMany({ where: { userId: id } }));
    await handlerErrorDb(this.databaseService.session.deleteMany({ where: { userId: id } }));
    await handlerErrorDb(this.databaseService.user.delete({ where: { id } }));
  }
}
