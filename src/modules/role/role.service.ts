import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDbService } from './role.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IClaim, IRole } from 'src/types/role.type';
import { UserDbService } from '../user/user.db.service';
import { Claims } from 'src/config/claims';

export interface IRoleAllRes extends Pick<IRole, 'id' | 'name'> {}
export interface IRoleRes extends Pick<IRole, 'id' | 'name'> {
  claims: string[];
}
interface ICreateRole extends Pick<IRole, 'name' | 'claims'> {}

interface IRoleService {
  getAll(): Promise<IRoleAllRes[]>;
  getById({ id }: { id: string }): Promise<IRoleRes>;
  getByName({ name }: { name: string }): Promise<IRoleRes>;
  create(data: ICreateRole): Promise<IMessageRes>;
  createAdmin({ userId }: { userId: string }): Promise<IMessageRes>;
  edit(data: IRole): Promise<IMessageRes>;
  // editOnUser
  // editOnAllUsers
  delete({ id }: { id: string }): Promise<IMessageRes>;
}

@Injectable()
export class RoleService implements IRoleService{
  constructor(
    private readonly roleDbService: RoleDbService,
    private readonly userDbService: UserDbService,
  ) {}

  // get all role
  public async getAll(): Promise<IRoleAllRes[]> {
    const roleList = await this.roleDbService.findAll();
    return roleList;
  }

  // get role by id
  public async getById({ id }: { id: string }): Promise<IRoleRes> {
    // check with role is exist
    const role = await this.roleDbService.findById({ id });
    if (!role) throw new BadRequestException('Role is not found');
    // find role claims
    const roleClaims = await this.roleDbService.findClaimsForRole({ roleId: role.id });
    return { ...role, claims: roleClaims.map((claim) => claim.name) };
  }

  // get role by name
  public async getByName({ name }: { name: string }): Promise<IRoleRes> {
    // check with role is exist
    const role = await this.roleDbService.findByName({ name });
    if (!role) throw new BadRequestException('Role is not found');
    // find role claims
    const roleClaims = await this.roleDbService.findClaimsForRole({ roleId: role.id });
    return { ...role, claims: roleClaims.map((claim) => claim.name) };
  }

  public async create({ name, claims }: ICreateRole): Promise<IMessageRes> {
    // check with role is exist
    const role = await this.roleDbService.findByName({ name });
    if (!role) throw new BadRequestException('Role is not found');
    // create new role
    await this.roleDbService.createRole({ name, claims });
    return { message: `Role '${name}' is create` };
  }

  public async createAdmin({ userId }: { userId: string }): Promise<IMessageRes> {
    // check with user is exist
    const user = await this.userDbService.findById({ id: userId });
    if (!user) throw new BadRequestException('User is not found');
    // get role
    const adminRole = await this.roleDbService.findByName({ name: 'admin' });
    if (adminRole) {
      await this.userDbService.editRole({ id: userId, roleId: adminRole.id });
    } else {
      const newAdminRole = await this.roleDbService.createRole({
        name: 'admin',
        claims: Object.values(Claims).map((claim) => claim),
      });
      await this.userDbService.editRole({ id: userId, roleId: newAdminRole.id });
    }
    return { message: `Role '${user.name}' is edit` };
  }

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
