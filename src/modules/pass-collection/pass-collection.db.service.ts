import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';
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

// SERVICE
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
    if (!userId) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );

    return res.map((item) => {
      if (userId === item.userId) return { id: item.id, name: item.name };
    });
  }

  public async findById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    if (!userId || !id) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );

    if (res.userId === userId) return { id: res.id, name: res.name, data: res.data };
    return null;
  }

  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    if (!userId || !name || !data) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.create({
        data: { userId, name, data },
      }),
    );

    return { id: res.id };
  }

  public async editName({ id, userId, name }: IEditNameReq): Promise<void> {
    if (!id || !userId || !name) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
  }

  public async editData({ id, userId, data }: IEditDataReq): Promise<void> {
    if (!id || !userId || !data) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { data },
      }),
    );
  }

  public async delete({ id, userId }: IDeleteInDbReq): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
  }
}
