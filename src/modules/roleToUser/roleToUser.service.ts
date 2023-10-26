import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDbService } from 'src/database/role.db.service';
import { RoleToUserDbService } from 'src/database/roleToUser.db.service';
import {
  IRoleToUser,
  IRoleToUser_DeleteByUserId,
  IRoleToUser_FindById,
  IRoleToUser_FindByUserId,
  IRoleToUser_Set,
} from 'src/types/roleToUser.type';
import { UserDbService } from 'src/database/user.db.service';

interface IRoleToUserService {
  getAll(): Promise<IRoleToUser[]>;
  getById(data: IRoleToUser_FindById): Promise<IRoleToUser>;
  getByUserId(data: IRoleToUser_FindByUserId): Promise<IRoleToUser>;
  set(data: IRoleToUser_Set): Promise<{ message: string }>;
  delete(data: IRoleToUser_DeleteByUserId): Promise<{ message: string }>;
}

@Injectable()
export class RoleToUserService implements IRoleToUserService {
  constructor(
    private readonly roleDbService: RoleDbService,
    private readonly roleToUserDbService: RoleToUserDbService,
    private readonly userDbService: UserDbService,
  ) {}

  // private

  private async checkRoleToUserById({ id }: { id: string }) {
    const findRoleToUser = await this.roleToUserDbService.findById({ id });
    if (!findRoleToUser) throw new BadRequestException('This id is not correct');
    return findRoleToUser;
  }

  private async checkUserById({ id }: { id: string }) {
    const findUser = await this.userDbService.findById({ id });
    if (!findUser) throw new BadRequestException('This id is not correct');
    return findUser;
  }

  private async checkRoleById({ id }: { id: string }) {
    const findRoleId = await this.roleDbService.findById({ id });
    if (!findRoleId) throw new BadRequestException('This id is not correct');
    return findRoleId;
  }

  // public

  public async getAll(): Promise<IRoleToUser[]> {
    const roleToUserList = await this.roleToUserDbService.findAll();
    return roleToUserList;
  }

  public async getById({ id }: IRoleToUser_FindById): Promise<IRoleToUser> {
    const roleToUser = await this.checkRoleToUserById({ id });
    return roleToUser;
  }

  public async getByUserId({ userId }: IRoleToUser_FindByUserId): Promise<IRoleToUser> {
    await this.checkUserById({ id: userId });

    const roleToUser = await this.roleToUserDbService.findByUserId({ userId });
    if (!roleToUser) throw new BadRequestException('This id is not correct');
    return roleToUser;
  }

  public async set({ roleId, userId }: IRoleToUser_Set): Promise<{ message: string }> {
    await this.checkUserById({ id: userId });
    await this.checkRoleById({ id: roleId });

    const getByUserId = await this.roleToUserDbService.findByUserId({ userId });
    if (!getByUserId) {
      await this.roleToUserDbService.create({ roleId, userId });
      return { message: 'Role to user is created' };
    }

    await this.roleToUserDbService.update({ id: getByUserId.id, roleId });
    return { message: 'Role to user is update' };
  }

  public async delete({ userId }: IRoleToUser_DeleteByUserId): Promise<{ message: string }> {
    const findRoleToUser = await this.roleToUserDbService.findByUserId({ userId });
    if (!findRoleToUser) throw new BadRequestException('This id is not correct');

    await this.roleToUserDbService.deleteByUserId({ userId });
    return { message: 'Role to user is deleted' };
  }
}
