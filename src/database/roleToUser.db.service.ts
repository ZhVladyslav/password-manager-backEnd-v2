import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  IRoleToUser,
  IRoleToUser_Create,
  IRoleToUser_Delete,
  IRoleToUser_DeleteByRoleId,
  IRoleToUser_DeleteByUserId,
  IRoleToUser_FindById,
  IRoleToUser_FindByUserId,
  IRoleToUser_Update,
} from 'src/types/roleToUser.type';

interface IRoleToUserDbService {
  findAll(): Promise<IRoleToUser[]>;
  findById(data: IRoleToUser_FindById): Promise<IRoleToUser>;
  findByUserId(data: IRoleToUser_FindByUserId): Promise<IRoleToUser>;
  create(data: IRoleToUser_Create): Promise<IRoleToUser>;
  update(data: IRoleToUser_Update): Promise<IRoleToUser>;
  delete(data: IRoleToUser_Delete): Promise<void>;
  deleteByRoleId(data: IRoleToUser_DeleteByRoleId): Promise<void>;
  deleteByUserId(data: IRoleToUser_DeleteByUserId): Promise<void>;
}

@Injectable()
export class RoleToUserDbService implements IRoleToUserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IRoleToUser[]> {
    const roleToUserList = await handlerErrorDb(this.databaseService.roleToUser.findMany());
    return roleToUserList;
  }

  public async findById({ id }: IRoleToUser_FindById): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.findFirst({ where: { id } }));
    return !roleToUser ? null : roleToUser;
  }

  public async findByUserId({ userId }: IRoleToUser_FindByUserId): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.findFirst({ where: { userId } }));
    return !roleToUser ? null : roleToUser;
  }

  public async create({ roleId, userId }: IRoleToUser_Create): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.create({ data: { roleId, userId } }));
    return !roleToUser ? null : roleToUser;
  }

  public async update({ id, roleId }: IRoleToUser_Update): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(
      this.databaseService.roleToUser.update({ where: { id }, data: { roleId } }),
    );
    return !roleToUser ? null : roleToUser;
  }

  public async delete({ id }: IRoleToUser_Delete): Promise<void> {
    await handlerErrorDb(this.databaseService.roleToUser.delete({ where: { id } }));
  }

  public async deleteByRoleId({ roleId }: IRoleToUser_DeleteByRoleId): Promise<void> {
    await handlerErrorDb(this.databaseService.roleToUser.deleteMany({ where: { roleId } }));
  }

  public async deleteByUserId({ userId }: IRoleToUser_DeleteByUserId): Promise<void> {
    await handlerErrorDb(this.databaseService.roleToUser.deleteMany({ where: { userId } }));
  }
}
