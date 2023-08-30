import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';
import { ISession } from 'src/types/session.type';

// REQ
interface IGetAllReq extends Pick<ISession, 'userId'> {}
interface IGetByIdReq extends Pick<ISession, 'id' | 'userId'> {}
interface IDeleteAllReq extends Pick<ISession, 'userId'> {}
interface IDeleteByIdReq extends Pick<ISession, 'id' | 'userId'> {}

// RES
interface IGetAllRes extends Pick<ISession, 'id' | 'tokenId'> {}
interface IGetByIdRes extends Pick<ISession, 'id' | 'tokenId'> {}

// SERVICE

@Injectable()
export class SessionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  FIND  ---------------- */

  // get all user sessions
  public async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    if (!userId) throw new BadRequestException();

    const res = await handlers.dbError(this.databaseService.session.findMany({ where: { userId } }));

    return res.map((item) => {
      if (item.userId === userId) return { id: item.id, tokenId: item.tokenId };
    });
  }

  // get session by id
  public async getById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    if (!id || !userId) throw new BadRequestException();

    const res = await handlers.dbError(this.databaseService.session.findFirst({ where: { id, userId } }));

    if (res.userId === userId) return { id: res.id, tokenId: res.tokenId };

    return null;
  }

  /* ----------------  DELETE  ---------------- */

  // delete all session
  public async deleteAll({ userId }: IDeleteAllReq): Promise<void> {
    if (!userId) throw new BadRequestException();

    await handlers.dbError(this.databaseService.session.deleteMany({ where: { userId } }));
  }

  // delete session by id
  public async deleteById({ id, userId }: IDeleteByIdReq): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(this.databaseService.session.delete({ where: { id, userId } }));
  }
}
