import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IDeleteAllReq, IDeleteByIdReqDb, IGetAllReq, IGetAllRes, IGetByIdReq, IGetByIdRes } from './session.type';

interface ISessionDbService {
  getAll(data: IGetAllReq): Promise<IGetAllRes[]>;
  getById(data: IGetByIdReq): Promise<IGetByIdRes>;
  deleteAll(data: IDeleteAllReq): Promise<void>;
  deleteById(data: IDeleteByIdReqDb): Promise<void>;
}

@Injectable()
export class SessionDbService implements ISessionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    const res = await handlerErrorDb(this.databaseService.session.findMany({ where: { userId } }));

    return res.map((item) => ({ id: item.id, tokenId: item.tokenId }));
  }

  public async getById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    const res = await handlerErrorDb(this.databaseService.session.findFirst({ where: { id, userId } }));

    if (res.userId === userId) return { id: res.id, tokenId: res.tokenId };

    return null;
  }

  public async deleteAll({ userId }: IDeleteAllReq): Promise<void> {
    await handlerErrorDb(this.databaseService.session.deleteMany({ where: { userId } }));
  }

  public async deleteById({ id, userId }: IDeleteByIdReqDb): Promise<void> {
    await handlerErrorDb(this.databaseService.session.delete({ where: { id, userId } }));
  }
}
