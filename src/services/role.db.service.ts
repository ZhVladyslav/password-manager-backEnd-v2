import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { ISession } from 'src/types/session.type';

interface IFindByName extends Pick<ISession, 'id' | 'userId'> {}
interface IFindById extends Pick<ISession, 'id' | 'userId'> {}
interface IFindClaimById extends Pick<ISession, 'id' | 'userId'> {}

interface ICreate extends Pick<ISession, 'userId' | 'tokenId' | 'expDate'> {}
interface IEdit extends Pick<ISession, 'userId' | 'tokenId' | 'expDate'> {}
interface IDelete extends Pick<ISession, 'id' | 'userId'> {}

interface ISessionDbService {
  findById(data: IFindById): Promise<ISession>;
  findByTokenId(data: IFindByTokenId): Promise<ISession>;
  create(data: ICreate): Promise<ISession>;
  delete(data: IDelete): Promise<void>;
}

@Injectable()
export class SessionDbService implements ISessionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findById({ id, userId }: IFindById): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.findFirst({ where: { id, userId } }));
    if (!session) return null;
    return session;
  }

  public async findByTokenId({ userId, tokenId }: IFindByTokenId): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.findFirst({ where: { userId, tokenId } }));
    if (!session) return null;
    return session;
  }

  public async create({ userId, tokenId, expDate }: ICreate): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.create({ data: { userId, tokenId, expDate } }));
    if (!session) return null;
    return session;
  }

  public async delete({ id, userId }: IDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.session.delete({ where: { id, userId } }));
  }
}
