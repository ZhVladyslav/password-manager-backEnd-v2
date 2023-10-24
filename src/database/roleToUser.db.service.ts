import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  IRoleToUser,
  IRoleToUserDbCreate,
  IRoleToUserDbDelete,
  IRoleToUserDbFindById,
  IRoleToUserDbFindByUserId,
  IRoleToUserDbUpdate,
} from 'src/types/roleToUser.type';

interface IRoleToUserDbService {
  findById(data: IRoleToUserDbFindById): Promise<IRoleToUser>;
  findByUserId(data: IRoleToUserDbFindByUserId): Promise<IRoleToUser>;
  create(data: IRoleToUserDbCreate): Promise<IRoleToUser>;
  update(data: IRoleToUserDbUpdate): Promise<IRoleToUser>;
  delete(data: IRoleToUserDbDelete): Promise<void>;
}

@Injectable()
export class RoleToUserDbService implements IRoleToUserDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findById({ id }: IRoleToUserDbFindById): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.findFirst({ where: { id } }));
    return !roleToUser ? null : roleToUser;
  }

  public async findByUserId({ userId }: IRoleToUserDbFindByUserId): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.findFirst({ where: { userId } }));
    return !roleToUser ? null : roleToUser;
  }

  public async create({ roleId, userId }: IRoleToUserDbCreate): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(this.databaseService.roleToUser.create({ data: { roleId, userId } }));
    return !roleToUser ? null : roleToUser;
  }

  public async update({ id, roleId }: IRoleToUserDbUpdate): Promise<IRoleToUser> {
    const roleToUser = await handlerErrorDb(
      this.databaseService.roleToUser.update({ where: { id }, data: { roleId } }),
    );
    return !roleToUser ? null : roleToUser;
  }

  public async delete({ id }: IRoleToUserDbDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.roleToUser.delete({ where: { id } }));
  }
}
