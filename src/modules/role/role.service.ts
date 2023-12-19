import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDbService } from 'src/database/role.db.service';
import { ClaimDbService } from 'src/database/claim.db.service';
import { IRole } from 'src/types/role.type';
import { IClaim } from 'src/types/claim.type';
import { RoleToUserDbService } from 'src/database/roleToUser.db.service';

interface IService {
  id: string;
  name_en: string;
  claims: string[];
}

interface IGetById extends Pick<IService, 'id'> {}
interface IGetByName extends Pick<IService, 'name_en'> {}
export interface IGetByIdRes extends IRole {
  claims: IClaim[];
}
export interface IGetByNameRes extends IRole {
  claims: IClaim[];
}
interface ICreate extends Omit<IRole, 'id' | 'createDate' | 'lastUpdate'> {
  claims: string[];
}
interface IEdit extends Omit<IRole, 'createDate' | 'lastUpdate'> {
  claims: string[];
}
interface IDelete extends Pick<IService, 'id'> {}

interface IRoleService {
  getAll(): Promise<IRole[]>;
  getById(data: IGetById): Promise<IGetByIdRes>;
  getByName(data: IGetByName): Promise<IGetByNameRes>;
  create(data: ICreate): Promise<{ message: string }>;
  edit(data: IEdit): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    private readonly roleDbService: RoleDbService,
    private readonly claimDbService: ClaimDbService,
    private readonly roleToUserDbService: RoleToUserDbService,
  ) {}

  // private

  private async checkRoleById({ id }: { id: string }): Promise<IRole> {
    const role = await this.roleDbService.findById({ id });
    if (!role) throw new BadRequestException('Role is not found');
    return role;
  }

  private async checkRoleByName({ name_en }: { name_en: string }): Promise<IRole> {
    const role = await this.roleDbService.findByName({ name_en });
    if (!role) throw new BadRequestException('Role is not found');
    return role;
  }

  // public

  public async getAll(): Promise<IRole[]> {
    const roleList = await this.roleDbService.findAll();
    return roleList;
  }

  public async getById({ id }: IGetById): Promise<IGetByIdRes> {
    const role = await this.checkRoleById({ id });

    const roleClaims = await this.claimDbService.findByRoleId({ roleId: role.id });
    return { ...role, claims: roleClaims };
  }

  public async getByName({ name_en }: IGetByName): Promise<IGetByNameRes> {
    const role = await this.checkRoleByName({ name_en });

    const roleClaims = await this.claimDbService.findByRoleId({ roleId: role.id });
    return { ...role, claims: roleClaims };
  }

  public async create(data: ICreate): Promise<{ message: string }> {
    const { name_en, name_ua,  description_en, description_ua,  claims } = data;
    const dataToCreate = { name_en, name_ua,  description_en, description_ua,  };

    const roleInDb = await this.roleDbService.findByName({ name_en });
    if (roleInDb) throw new BadRequestException('This role name already is set');

    const newRole = await this.roleDbService.create(dataToCreate);
    await this.claimDbService.create({ roleId: newRole.id, claims });
    return { message: `Role '${name_en}' is create` };
  }

  public async edit(data: IEdit): Promise<{ message: string }> {
    const { id, claims } = data;
    const { name_en, name_ua,  description_en, description_ua,  } = data;

    await this.checkRoleById({ id });

    await this.roleDbService.update({ id, name_en, name_ua,  description_en, description_ua,  });
    await this.claimDbService.delete({ roleId: id });
    await this.claimDbService.create({ roleId: id, claims });

    return { message: 'Role is edit' };
  }

  public async delete({ id }: IDelete): Promise<{ message: string }> {
    await this.checkRoleById({ id });
    await this.claimDbService.delete({ roleId: id });
    await this.roleToUserDbService.deleteByRoleId({ roleId: id });
    await this.roleDbService.delete({ id });

    return { message: 'Role is delete' };
  }
}
