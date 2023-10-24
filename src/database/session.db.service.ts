import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  ISession,
  ISessionDbCreate,
  ISessionDbDeleteAll,
  ISessionDbDeleteById,
  ISessionDbFindAll,
  ISessionDbFindById,
  ISessionDbFindByTokenId,
} from 'src/types/session.type';

interface ISessionDbService {
  findAllToAllUsers(): Promise<ISession[]>;
  findAll(data: ISessionDbFindAll): Promise<ISession[]>;
  findById(data: ISessionDbFindById): Promise<ISession>;
  findByTokenId(data: ISessionDbFindByTokenId): Promise<ISession>;
  create(data: ISessionDbCreate): Promise<ISession>;
  deleteById(data: ISessionDbDeleteById): Promise<ISession>;
  deleteAll(data: ISessionDbDeleteAll): Promise<void>;
}

@Injectable()
export class SessionDbService implements ISessionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAllToAllUsers(): Promise<ISession[]> {
    const session = await handlerErrorDb(this.databaseService.session.findMany());
    return session;
  }

  public async findAll({ userId }: ISessionDbFindAll): Promise<ISession[]> {
    const session = await handlerErrorDb(this.databaseService.session.findMany({ where: { userId } }));
    return session;
  }

  public async findById({ id, userId }: ISessionDbFindById): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.findFirst({ where: { id, userId } }));
    return !session ? null : session;
  }

  public async findByTokenId({ tokenId }: ISessionDbFindByTokenId): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.findFirst({ where: { tokenId } }));
    return !session ? null : session;
  }

  public async create({ userId, tokenId, expDate }: ISessionDbCreate): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.create({ data: { userId, tokenId, expDate } }));
    return !session ? null : session;
  }

  public async deleteById({ id, userId }: ISessionDbDeleteById): Promise<ISession> {
    const session = await handlerErrorDb(this.databaseService.session.delete({ where: { id, userId } }));
    return !session ? null : session;
  }

  public async deleteAll({ userId }: ISessionDbDeleteAll): Promise<void> {
    await handlerErrorDb(this.databaseService.session.deleteMany({ where: { userId } }));
  }
}
