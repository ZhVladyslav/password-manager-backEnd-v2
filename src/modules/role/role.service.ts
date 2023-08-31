import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDbService } from './role.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { ICreateReq, IDeleteReq, IEditReq, IGetAllRes, IGetByIdReq, IGetByIdRes } from './role.type';

interface IRoleService {
  getAll(): Promise<IGetAllRes[]>;
  getById(data: IGetByIdReq): Promise<IGetByIdRes>;
  create(data: ICreateReq): Promise<IMessageRes>;
  edit(data: IEditReq): Promise<IMessageRes>;
  delete(data: IDeleteReq): Promise<IMessageRes>;
}

@Injectable()
export class RoleService implements IRoleService {
  constructor(private readonly databaseService: RoleDbService) {}

  public async getAll(): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll();
  }

  public async getById({ id }: IGetByIdReq): Promise<IGetByIdRes> {
    return await this.databaseService.findById({ id });
  }

  public async create({ name, claims }: ICreateReq): Promise<IMessageRes> {
    await this.databaseService.create({ name, claims });
    return { message: 'Role is create' };
  }

  public async edit({ id, name, claims }: IEditReq): Promise<IMessageRes> {
    const findRole = this.databaseService.findById({ id });
    if (!findRole) throw new NotFoundException('Role not found');
    await this.databaseService.edit({ id, name, claims });
    return { message: 'role is edit' };
  }

  public async delete({ id, newRoleId }: IDeleteReq): Promise<IMessageRes> {
    const findRole = this.databaseService.findById({ id });
    if (!findRole) throw new NotFoundException('Role not found');
    await this.databaseService.delete({ id, newRoleId });
    return { message: 'Role is delete' };
  }
}
