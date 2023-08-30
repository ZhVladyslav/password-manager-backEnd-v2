import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionDbService } from './session.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IDeleteAllReq, IDeleteByIdReq, IGetAllReq, IGetAllRes } from './session.type';

interface ISessionService {
  getAll(data: IGetAllReq): Promise<IGetAllRes[]>;
  deleteAll(data: IDeleteAllReq): Promise<IMessageRes>;
  deleteById(data: IDeleteByIdReq): Promise<IMessageRes>;
}

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly databaseService: SessionDbService) {}

  async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    return await this.databaseService.getAll({ userId });
  }

  public async deleteAll({ userId }: IDeleteAllReq): Promise<IMessageRes> {
    await this.databaseService.deleteAll({ userId });

    return { message: 'Session is delete' };
  }

  public async deleteById({ id, userId }: IDeleteByIdReq): Promise<IMessageRes> {
    const resFindSession = await this.databaseService.getById({ id, userId });
    if (!resFindSession) throw new NotFoundException('Session is not found');

    await this.databaseService.deleteById({ id, userId });

    return { message: 'Session is delete' };
  }
}
