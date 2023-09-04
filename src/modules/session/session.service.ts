import { Injectable } from '@nestjs/common';
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
    const allSessionList = await this.databaseService.getAll({ userId });
    let quantityDelete = 0;

    for (const i in id) {
      let idIsExist = false;
      allSessionList.some((obj) => {
        if (obj.id === id[i]) idIsExist = true;
      });

      if (!idIsExist) continue;
      await this.databaseService.deleteById({ id: id[i], userId });
      quantityDelete += 1;
    }

    if (quantityDelete > 1) return { message: `Delete ${quantityDelete} sessions` };
    if (quantityDelete === 1) return { message: 'Session is delete' };
    return { message: 'Session is not delete' };
  }
}
