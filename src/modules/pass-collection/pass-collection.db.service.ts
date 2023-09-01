import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ICreateReq,
  ICreateRes,
  IDeleteInDbReq,
  IEditDataReq,
  IEditNameReq,
  IGetAllReq,
  IGetAllRes,
  IGetByIdReq,
  IGetByIdRes,
} from './pass-collection.types';
import { handlerErrorDb } from 'src/handlers/handlerError.db';

interface IPassCollectionDbService {
  findAll(data: IGetAllReq): Promise<IGetAllRes[]>;
  findById(data: IGetByIdReq): Promise<IGetByIdRes>;
  create(data: ICreateReq): Promise<ICreateRes>;
  editName(data: IEditNameReq): Promise<void>;
  editData(data: IEditDataReq): Promise<void>;
  delete(data: IDeleteInDbReq): Promise<void>;
}

@Injectable()
export class PassCollectionDbService implements IPassCollectionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    const res = await handlerErrorDb(this.databaseService.passCollection.findMany({ where: { userId } }));
    return res.map((item) => ({ id: item.id, name: item.name }));
  }

  public async findById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    const res = await handlerErrorDb(this.databaseService.passCollection.findFirst({ where: { userId, id } }));
    if (!res) return null;
    return { id: res.id, name: res.name, data: res.data };
  }

  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    const res = await handlerErrorDb(this.databaseService.passCollection.create({ data: { userId, name, data } }));
    return { id: res.id };
  }

  public async editName({ id, userId, name }: IEditNameReq): Promise<void> {
    await handlerErrorDb(this.databaseService.passCollection.update({ where: { id, userId }, data: { name } }));
  }

  public async editData({ id, userId, data }: IEditDataReq): Promise<void> {
    await handlerErrorDb(this.databaseService.passCollection.update({ where: { id, userId }, data: { data } }));
  }

  public async delete({ id, userId }: IDeleteInDbReq): Promise<void> {
    await handlerErrorDb(this.databaseService.passCollection.delete({ where: { id, userId } }));
  }

  // private checkRequiredField(value: unknown, fieldName: string): void {
  //   if (!value) {
  //     throw new BadRequestException(`${fieldName} is required.`);
  //   }
  // }
}
