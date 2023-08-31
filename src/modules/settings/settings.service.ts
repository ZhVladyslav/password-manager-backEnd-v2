import { BadRequestException, Injectable } from '@nestjs/common';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IEditRoleReq } from '../user/user.type';
import { ICreateReq, IGetAllRes } from '../role/role.type';
import { RoleDbService } from '../role/role.db.service';
import { UserDbService } from '../user/user.db.service';

interface ISettingsService {
  getAll(): Promise<IGetAllRes[]>;
  create(data: ICreateReq): Promise<IMessageRes>;
}

@Injectable()
export class SettingsService implements ISettingsService {
  constructor(
    private readonly roleService: RoleDbService,
    private readonly userService: UserDbService,
  ) {}

  public async getAll(): Promise<IGetAllRes[]> {
    return await this.roleService.findAll();
  }

  public async create({ name, claims }: ICreateReq): Promise<IMessageRes> {
    await this.roleService.create({ name, claims });
    return { message: 'Role is create' };
  }

  public async editRole({ id, roleId }: IEditRoleReq): Promise<IMessageRes> {
    const user = await this.userService.findUserById({ id });

    if (user.roleId === roleId) throw new BadRequestException('This role is already set');

    await this.userService.editRole({ id, roleId });

    return { message: 'user role is edit' };
  }
}
