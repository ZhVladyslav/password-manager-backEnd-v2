import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

interface ISession {
  id: string;
  tokenId: string;
  userId: string;
}

// GET
interface IGetSessionReq extends Omit<ISession, 'id' | 'tokenId'> {}
export interface IGetSessionRes extends Omit<ISession, 'userId'> {}

// GET BY ID
interface IGetByIdSessionReq extends Omit<ISession, 'tokenId'> {}
export interface IGetByIdSessionRes extends Omit<ISession, 'userId'> {}

// DELETE
interface IDeleteSessionReq extends Omit<ISession, 'tokenId'> {}
export interface IDeleteSessionRes {
  message: string;
}

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  async getAll({ userId }: IGetSessionReq): Promise<IGetSessionRes[]> {
    return await this.getAllInDatabase({ userId });
  }

  /* ----------------  DELETE  ---------------- */

  async delete({ id, userId }: IDeleteSessionReq): Promise<IDeleteSessionRes> {
    const resFindSession = await this.findSessionInDb({ id, userId });

    if (!resFindSession) throw new NotFoundException('Session is not found');

    await this.deleteInDatabase({ id, userId });

    return { message: 'Session is delete' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async getAllInDatabase({ userId }: IGetSessionReq): Promise<IGetSessionRes[]> {
    if (!userId) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.session.findMany({
        where: { userId },
      }),
    );

    return res.map((item) => {
      if (item.userId === userId) return { id: item.id, tokenId: item.tokenId };
    });
  }

  private async findSessionInDb({ id, userId }: IGetByIdSessionReq): Promise<IGetByIdSessionRes> {
    if (!id || !userId) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.session.findFirst({
        where: { id, userId },
      }),
    );

    if (res.userId === userId) return { id: res.id, tokenId: res.tokenId };
    return null;
  }

  private async deleteInDatabase({ id, userId }: IDeleteSessionReq): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.session.delete({
        where: { id, userId },
      }),
    );
  }
}
