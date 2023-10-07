import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDbService } from 'src/database/role.db.service';
import { ClaimDbService } from 'src/database/claim.db.service';
import { IRole } from 'src/types/role.type';
import { IClaim } from 'src/types/claim.type';

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
  ) {}

  public async getAll(): Promise<IRole[]> {
    const roleList = await this.roleDbService.findAll();
    return roleList;
  }

  private async getByIdPrivate({ id }: IGetById): Promise<IRole> {
    const role = await this.roleDbService.findById({ id });
    if (!role) throw new BadRequestException('Role is not found');
    return role;
  }

  public async getById({ id }: IGetById): Promise<IGetByIdRes> {
    const role = await this.roleDbService.findById({ id });
    if (!role) throw new BadRequestException('Role is not found');
    const roleClaims = await this.claimDbService.findByRoleId({ roleId: role.id });
    return { ...role, claims: roleClaims };
  }

  public async getByName({ name_en }: IGetByName): Promise<IGetByNameRes> {
    const role = await this.roleDbService.findByName({ name_en });
    if (!role) throw new BadRequestException('Role is not found');
    const roleClaims = await this.claimDbService.findByRoleId({ roleId: role.id });
    return { ...role, claims: roleClaims };
  }

  public async create(data: ICreate): Promise<{ message: string }> {
    const { name_en, name_ua, name_ru, description_en, description_ua, description_ru, claims } = data;
    const dataToCreate = { name_en, name_ua, name_ru, description_en, description_ua, description_ru };

    const roleInDb = await this.roleDbService.findByName({ name_en });
    if (roleInDb) throw new BadRequestException('This role name already is set');

    const newRole = await this.roleDbService.create(dataToCreate);
    await this.claimDbService.create({ roleId: newRole.id, claims });
    return { message: `Role '${name_en}' is create` };
  }

  public async edit(data: IEdit): Promise<{ message: string }> {
    const { id, claims } = data;
    const { name_en, name_ua, name_ru, description_en, description_ua, description_ru } = data;

    await this.getByIdPrivate({ id });
    await this.roleDbService.update({ id, name_en, name_ua, name_ru, description_en, description_ua, description_ru });
    await this.claimDbService.delete({ roleId: id });
    await this.claimDbService.create({ roleId: id, claims });

    return { message: 'Role is edit' };
  }

  public async delete({ id }: IDelete): Promise<{ message: string }> {
    await this.getByIdPrivate({ id });
    await this.claimDbService.delete({ roleId: id });
    await this.roleDbService.delete({ id });

    return { message: 'Role is delete' };
  }
}
