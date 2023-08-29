import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

export interface IPassCollection {
  id: string;
  userId: string;
  name: string;
  data: string;
}

// REQ
interface IFindAllReq extends Pick<IPassCollection, 'userId'> {}
interface IFindByIdReq extends Pick<IPassCollection, 'id' | 'userId'> {}
interface ICreateReq extends Pick<IPassCollection, 'userId' | 'name' | 'data'> {}
interface IEditNameReq extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
interface IEditDataReq extends Pick<IPassCollection, 'id' | 'userId' | 'data'> {}
interface IDeleteReq extends Pick<IPassCollection, 'id' | 'userId'> {}

// RES
interface IFindAllRes extends Pick<IPassCollection, 'id' | 'name'> {}
interface IFindByIdRes extends Pick<IPassCollection, 'id' | 'name' | 'data'> {}
interface ICreateRes extends Pick<IPassCollection, 'id'> {}

// SERVICE

@Injectable()
export class PassCollectionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  FIND  ---------------- */

  /** */
  public async findAll({ userId }: IFindAllReq): Promise<IFindAllRes[]> {
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

  /** */
  public async findById({ id, userId }: IFindByIdReq): Promise<IFindByIdRes> {
    if (!userId || !id) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );

    if (res.userId === userId) return { id: res.id, name: res.name, data: res.data };
    return null;
  }

  /* ----------------  CREATE  ---------------- */

  /** */
  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    if (!userId || !name || !data) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.create({
        data: { userId, name, data },
      }),
    );

    return { id: res.id };
  }

  /* ----------------  EDIT  ---------------- */

  /** */
  public async editName({ id, userId, name }: IEditNameReq): Promise<void> {
    if (!id || !userId || !name) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
  }

  /** */
  public async editData({ id, userId, data }: IEditDataReq): Promise<void> {
    if (!id || !userId || !data) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { data },
      }),
    );
  }

  /* ----------------  DELETE  ---------------- */

  /** */
  public async delete({ id, userId }: IDeleteReq): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
  }
}
