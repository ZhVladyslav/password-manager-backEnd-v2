import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  IRole,
  IRoleDbCreate,
  IRoleDbDelete,
  IRoleDbFindById,
  IRoleDbFindByName,
  IRoleDbUpdate,
} from 'src/types/role.type';

interface IRoleDbService {
  findAll(): Promise<IRole[]>;
  findById(data: IRoleDbFindById): Promise<IRole>;
  findByName(data: IRoleDbFindByName): Promise<IRole>;
  create(data: IRoleDbCreate): Promise<IRole>;
  update(data: IRoleDbUpdate): Promise<IRole>;
  delete(data: IRoleDbDelete): Promise<void>;
}

@Injectable()
export class RoleDbService implements IRoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IRole[]> {
    const roleList = await handlerErrorDb(this.databaseService.role.findMany());
    return roleList;
  }

  public async findById({ id }: IRoleDbFindById): Promise<IRole> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { id } }));
    return !role ? null : role;
  }

  public async findByName({ name_en }: IRoleDbFindByName): Promise<IRole> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { name_en } }));
    return !role ? null : role;
  }

  public async create(data: IRoleDbCreate): Promise<IRole> {
    const role = await handlerErrorDb(this.databaseService.role.create({ data }));
    return !role ? null : role;
  }

  public async update(data: IRoleDbUpdate): Promise<IRole> {
    const { id, name_en, name_ua,  description_en, description_ua,  } = data;
    const updateData = { name_en, name_ua,  description_en, description_ua,  };

    const role = await handlerErrorDb(this.databaseService.role.update({ where: { id }, data: updateData }));
    return !role ? null : role;
  }

  public async delete({ id }: IRoleDbDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.role.delete({ where: { id } }));
  }
}
