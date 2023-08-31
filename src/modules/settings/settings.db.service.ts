import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { ICreateReq, IGetAllRes } from './settings.type';

interface ISettingsDbService {
  findAll(): Promise<IGetAllRes[]>;
  create(data: ICreateReq): Promise<void>;
}

@Injectable()
export class SettingsDbService implements ISettingsDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IGetAllRes[]> {
    return await handlerErrorDb(this.databaseService.role.findMany());
  }

  public async create({ name, claims }: ICreateReq): Promise<void> {
    const newRole = await handlerErrorDb(this.databaseService.role.create({ data: { name } }));
    const newClaims = claims.map(async (claimName) => {
      return await handlerErrorDb(this.databaseService.claim.create({ data: { roleId: newRole.id, name: claimName } }));
    });
    await Promise.all(newClaims);
  }
}
