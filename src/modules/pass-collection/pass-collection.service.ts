import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PassCollectionDbService } from './pass-collection.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import {
  ICreateReq,
  ICreateRes,
  IDeleteReq,
  IEditDataReq,
  IEditNameReq,
  IGetAllReq,
  IGetAllRes,
  IGetByIdReq,
  IGetByIdRes,
} from './pass-collection.types';

interface IPassCollectionService {
  getAll(data: IGetAllReq): Promise<IGetAllRes[]>;
  getById(data: IGetByIdReq): Promise<IGetByIdRes>;
  create(data: ICreateReq): Promise<ICreateRes>;
  editName(data: IEditNameReq): Promise<IMessageRes>;
  editData(data: IEditDataReq): Promise<IMessageRes>;
  delete(data: IDeleteReq): Promise<IMessageRes>;
}

@Injectable()
export class PassCollectionService implements IPassCollectionService {
  constructor(private readonly databaseService: PassCollectionDbService) {}

  public async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll({ userId });
  }

  public async getById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    const res = await this.databaseService.findById({ id, userId });
    if (!res) throw new NotFoundException('Collection not found');
    return { id: res.id, name: res.name, data: res.data };
  }

  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    const userListPassCollection = await this.databaseService.findAll({ userId });
    for (const item of userListPassCollection) {
      if (item.name === name) throw new BadRequestException('The name is used');
    }
    const res = await this.databaseService.create({ userId, name, data });
    return { id: res.id };
  }

  public async editName({ userId, id, name }: IEditNameReq): Promise<IMessageRes> {
    const userListPassCollection = await this.databaseService.findAll({ userId });
    let passCollectionIsExist: boolean = false;
    for (const item of userListPassCollection) {
      if (item.id === id) passCollectionIsExist = true;
      if (item.name === name) {
        if (item.id === id) throw new BadRequestException('The name is already set');
        if (item.id !== id) throw new BadRequestException('The name is used');
      }
    }
    if (!passCollectionIsExist) throw new BadRequestException('Collection not found');
    await this.databaseService.editName({ id, name, userId });
    return { message: 'Name is edit' };
  }

  public async editData({ id, userId, data }: IEditDataReq): Promise<IMessageRes> {
    const passCollection = await this.databaseService.findById({ id, userId });
    if (!passCollection) throw new BadRequestException('Collection not found');
    await this.databaseService.editData({ id, userId, data });
    return { message: 'Data is edit' };
  }

  public async delete({ id, userId }: IDeleteReq): Promise<IMessageRes> {
    if (id.length === 0) throw new BadRequestException('id not passed');
    let calculating = 0;
    const toDeleteArray = [...new Set(id)];
    const userListPassCollection = await this.databaseService.findAll({ userId });
    for (const item of userListPassCollection) {
      if (!toDeleteArray.includes(item.id)) continue;
      calculating += 1;
      await this.databaseService.delete({ id: item.id, userId: userId });
    }
    if (id.length === 1) return { message: 'Pass collection is delete' };
    return { message: `Delete ${calculating} pass collections` };
  }
}
