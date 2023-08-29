import { Injectable, NotFoundException } from '@nestjs/common';
import { ISession, SessionDbService } from './session.db.service';

// REQ
interface IGetAllReq extends Pick<ISession, 'userId'> {}
interface IDeleteAllReq extends Pick<ISession, 'userId'> {}
interface IDeleteByIdReq extends Pick<ISession, 'id' | 'userId'> {}

// RES
export interface IGetAllRes extends Pick<ISession, 'id' | 'tokenId'> {}
export interface IRes {
  message: string;
}

// SERVICE

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: SessionDbService) {}

  /* ----------------  GET  ---------------- */

  async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    return await this.databaseService.getAll({ userId });
  }

  /* ----------------  DELETE  ---------------- */

  public async deleteAll({ userId }: IDeleteAllReq): Promise<IRes> {
    if (!userId) throw new NotFoundException('Session is not found');

    await this.databaseService.deleteAll({ userId });

    return { message: 'Session is delete' };
  }

  public async deleteById({ id, userId }: IDeleteByIdReq): Promise<IRes> {
    const resFindSession = await this.databaseService.getById({ id, userId });

    if (!resFindSession) throw new NotFoundException('Session is not found');

    await this.databaseService.deleteById({ id, userId });

    return { message: 'Session is delete' };
  }
}
