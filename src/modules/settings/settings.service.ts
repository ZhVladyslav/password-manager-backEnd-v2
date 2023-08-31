import { Injectable, NotFoundException } from '@nestjs/common';
import { IMessageRes } from 'src/types/defaultRes.type';
import { ICreateReq, IGetAllRes } from './settings.type';
import { SettingsDbService } from './settings.db.service';

interface ISettingsService {
  getAll(): Promise<IGetAllRes[]>;
  create(data: ICreateReq): Promise<IMessageRes>;
}

@Injectable()
export class SettingsService implements ISettingsService {
  constructor(private readonly databaseService: SettingsDbService) {}

  public async getAll(): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll();
  }

  public async create({ name, claims }: ICreateReq): Promise<IMessageRes> {
    await this.databaseService.create({ name, claims });
    return { message: 'Role is create' };
  }
}
