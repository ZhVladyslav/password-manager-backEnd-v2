import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDbService } from './role.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IClaim, IRole } from 'src/types/role.type';

interface IClaimsInRoleRes extends Pick<IClaim, 'id' | 'name'> {}

export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
export interface IGetByIdReq extends Pick<IRole, 'id'> {}
export interface IGetByIdRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaimsInRoleRes[];
}
export interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
export interface IEditReq extends IRole {}
export interface IDeleteReq extends Pick<IRole, 'id'> {
  newRoleId: string | null;
}

interface IRoleService {
  getAll(): Promise<IGetAllRes[]>;
  getById(data: IGetByIdReq): Promise<IGetByIdRes>;
  create(data: ICreateReq): Promise<IMessageRes>;
  edit(data: IEditReq): Promise<IMessageRes>;
  delete(data: IDeleteReq): Promise<IMessageRes>;
}

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: RoleDbService) {}

  /**
   * 
   * **get all
   * **get by id
   * **get by name
   * 
   * create role
   * create admin
   * 
   * edit role
   * edit on user
   * edit on all users
   * 
   * delete
   * 
   */

  /**
   public async getAll(): Promise<> {}
   public async getById(): Promise<> {}
   public async getByName(): Promise<> {}
   public async create(): Promise<> {}
   public async createAdmin(): Promise<> {}
   public async edit(): Promise<> {}
   public async editOnUser(): Promise<> {}
   public async editOnAllUsers(): Promise<> {}
   */

  public async getAll(): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll();
  }

  // public async getById({ id }: IGetByIdReq): Promise<IGetByIdRes> {
  //   return await this.databaseService.findById({ id });
  // }

  // public async create({ name, claims }: ICreateReq): Promise<IMessageRes> {
  //   await this.databaseService.create({ name, claims });
  //   return { message: 'Role is create' };
  // }

  // public async edit({ id, name, claims }: IEditReq): Promise<IMessageRes> {
  //   const findRole = this.databaseService.findById({ id });
  //   if (!findRole) throw new NotFoundException('Role not found');
  //   await this.databaseService.edit({ id, name, claims });
  //   return { message: 'role is edit' };
  // }

  // public async delete({ id, newRoleId }: IDeleteReq): Promise<IMessageRes> {
  //   const findRole = this.databaseService.findById({ id });
  //   if (!findRole) throw new NotFoundException('Role not found');
  //   await this.databaseService.delete({ id, newRoleId });
  //   return { message: 'Role is delete' };
  // }
}
