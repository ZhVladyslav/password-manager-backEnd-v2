import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDbService } from 'src/database/role.db.service';
import { RoleToUserDbService } from 'src/database/roleToUser.db.service';
import {
  IRoleToUser,
  IRoleToUser_Create,
  IRoleToUser_Delete,
  IRoleToUser_FindById,
  IRoleToUser_FindByUserId,
  IRoleToUser_Update,
} from 'src/types/roleToUser.type';
import { UserDbService } from 'src/database/user.db.service';

interface IRoleToUserService {
  getAll(): Promise<IRoleToUser[]>;
  getById(data: IRoleToUser_FindById): Promise<IRoleToUser>;
  getByUserId(data: IRoleToUser_FindByUserId): Promise<IRoleToUser>;
  create(data: IRoleToUser_Create): Promise<{ message: string }>;
  edit(data: IRoleToUser_Update): Promise<{ message: string }>;
  delete(data: IRoleToUser_Delete): Promise<{ message: string }>;
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

  public async create({ roleId, userId }: IRoleToUser_Create): Promise<{ message: string }> {
    await this.checkUserById({ id: userId });
    await this.checkRoleById({ id: roleId });

    const roleToUser = await this.roleToUserDbService.create({ roleId, userId });
    if (!roleToUser) throw new BadRequestException('This id is not correct');

    return { message: 'Role to user is created' };
  }

  public async edit({ id, roleId }: IRoleToUser_Update): Promise<{ message: string }> {
    await this.checkRoleById({ id: roleId });
    await this.checkRoleToUserById({ id });

    const roleToUser = await this.roleToUserDbService.update({ id, roleId });
    if (!roleToUser) throw new BadRequestException('This id is not correct');
    return { message: 'Role to user is created' };
  }

  public async delete({ id }: IRoleToUser_Delete): Promise<{ message: string }> {
    await this.checkRoleToUserById({ id });

    await this.roleToUserDbService.delete({ id });
    return { message: 'Role to user is deleted' };
  }
}
