import { Injectable } from '@nestjs/common';
import { RoleDbService } from './role.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IClaim, IRole } from 'src/types/role.type';

interface IRoleAllRes extends Pick<IRole, 'id' | 'name'> {}
interface IRoleRes extends Pick<IRole, 'id' | 'name'> {
  claims: string[];
}
interface ICreateRole extends Pick<IRole, 'name' | 'claims'> {}

interface IRoleService {
  getAll(): Promise<IRoleAllRes[]>;
  getById({ id }: { id: string }): Promise<IRoleRes>;
  getByName({ name }: { name: string }): Promise<IRoleRes>;
  create(data: ICreateRole): Promise<IMessageRes>;
  // createAdmin
  edit(data: IRole): Promise<IMessageRes>;
  // editOnUser
  // editOnAllUsers
  delete({ id }: { id: string }): Promise<IMessageRes>;
}

@Injectable()
export class RoleService {
  constructor(private readonly roleDbService: RoleDbService) {}

  // get all role
  public async getAll(): Promise<IRoleAllRes[]> {
    const roleList = await this.roleDbService.findAll();
    return roleList;
  }

  // get role by id
  public async getById({ id }: { id: string }): Promise<IRoleRes> {
    const role = await this.roleDbService.findById({ id });
    const roleClaims = await this.roleDbService.findClaimsForRole({ roleId: role.id });
    return { ...role, claims: roleClaims.map((claim) => claim.name) };
  }

  // get role by name
  public async getByName({ name }: { name: string }): Promise<IRoleRes> {
    const role = await this.roleDbService.findByName({ name });
    const roleClaims = await this.roleDbService.findClaimsForRole({ roleId: role.id });
    return { ...role, claims: roleClaims.map((claim) => claim.name) };
  }

  public async create({ name, claims }: ICreateRole): Promise<IMessageRes> {
    await this.roleDbService.createRole({ name, claims });
    return { message: `Role '${name}' is create` };
  }

  public async createAdmin(): Promise<void> {}

  public async edit({ id, name, claims }: IRole): Promise<IMessageRes> {
    await this.roleDbService.editRole({ id, name, claims });
    return { message: `Role '${name}' is edit` };
  }

  public async editOnUser(): Promise<void> {}

  public async editOnAllUsers(): Promise<void> {}

  public async delete({ id }: { id: string }): Promise<IMessageRes> {
    await this.roleDbService.deleteRole({ id });
    return { message: 'Role is delete' };
  }
}
