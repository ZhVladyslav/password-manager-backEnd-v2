import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { ISession } from 'src/types/session.type';

interface IFindAll extends Pick<ISession, 'userId'> {}
interface IFindById extends Pick<ISession, 'id'> {}
interface IFindByTokenId extends Pick<ISession, 'tokenId'> {}
interface ICreate extends Pick<ISession, 'userId' | 'tokenId' | 'expDate'> {}
interface IDeleteById extends Pick<ISession, 'id' > {}
interface IDeleteAll extends Pick<ISession, 'userId'> {}

interface ISessionDbService {
  findAll(data: IFindAll): Promise<ISession[]>;
  findById(data: IFindById): Promise<ISession>;
  findByTokenId(data: IFindByTokenId): Promise<ISession>;
  create(data: ICreate): Promise<ISession>;
  deleteById(data: IDeleteById): Promise<ISession>;
  deleteAll(data: IDeleteAll): Promise<void>;
}

@Injectable()
export class SessionDbService implements ISessionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll({ userId }: IFindAll): Promise<ISession[]> {
    const session = await handlerErrorDb(
      this.databaseService.session.findMany({
        where: { userId },
      }),
    );
    return session;
  }

  public async findById({ id }: IFindById): Promise<ISession> {
    const session = await handlerErrorDb(
      this.databaseService.session.findFirst({
        where: { id },
      }),
    );
    if (!session) return null;
    return session;
  }

  public async findByTokenId({ tokenId }: IFindByTokenId): Promise<ISession> {
    const session = await handlerErrorDb(
      this.databaseService.session.findFirst({
        where: { tokenId },
      }),
    );
    if (!session) return null;
    return session;
  }

  public async create({ userId, tokenId, expDate }: ICreate): Promise<ISession> {
    const session = await handlerErrorDb(
      this.databaseService.session.create({
        data: { userId, tokenId, expDate },
      }),
    );
    if (!session) return null;
    return session;
  }

  public async deleteById({ id }: IDeleteById): Promise<ISession> {
    const session = await handlerErrorDb(
      this.databaseService.session.delete({
        where: { id },
      }),
    );
    if (!session) return null;
    return session;
  }

  public async deleteAll({ userId }: IDeleteAll): Promise<void> {
    await handlerErrorDb(
      this.databaseService.session.deleteMany({
        where: { userId },
      }),
    );
  }
}
