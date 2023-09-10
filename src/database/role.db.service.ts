import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { IRole } from 'src/types/role.type';

interface IFindById extends Pick<IRole, 'id'> {}
interface IFindByName extends Pick<IRole, 'name_en'> {}
interface ICreate extends Omit<IRole, 'id' | 'createDate' | 'lastUpdate'> {}
interface IUpdate extends Omit<IRole, 'createDate' | 'lastUpdate'> {}
interface IDelete extends Pick<IRole, 'id'> {}

interface IRoleDbService {
  findAll(): Promise<IRole[]>;
  findById(data: IFindById): Promise<IRole>;
  findByName(data: IFindByName): Promise<IRole>;
  create(data: ICreate): Promise<IRole>;
  update(data: IUpdate): Promise<IRole>;
  delete(data: IDelete): Promise<void>;
}

@Injectable()
export class RoleDbService implements IRoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IRole[]> {
    const roleList = await handlerErrorDb(this.databaseService.role.findMany());
    return roleList;
  }

  public async findById({ id }: IFindById): Promise<IRole> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { id } }));
    if (!role) return null;
    return role;
  }

  public async findByName({ name_en }: IFindByName): Promise<IRole> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { name_en } }));
    if (!role) return null;
    return role;
  }

  public async create(data: ICreate): Promise<IRole> {
    const { name_en, name_ua, name_ru, description_en, description_ua, description_ru } = data;
    const role = await handlerErrorDb(
      this.databaseService.role.create({
        data: { name_en, name_ua, name_ru, description_en, description_ua, description_ru },
      }),
    );
    if (!role) return null;
    return role;
  }

  public async update(data: IUpdate): Promise<IRole> {
    const { id, name_en, name_ua, name_ru, description_en, description_ua, description_ru } = data;
    const role = await handlerErrorDb(
      this.databaseService.role.update({
        where: { id },
        data: { name_en, name_ua, name_ru, description_en, description_ua, description_ru },
      }),
    );
    if (!role) return null;
    return role;
  }

  public async delete({ id }: IDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.role.delete({ where: { id } }));
  }
}
