import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import {
  IPassCollection,
  IPassCollectionDbCreate,
  IPassCollectionDbDeleteAll,
  IPassCollectionDbDeleteById,
  IPassCollectionDbFindAll,
  IPassCollectionDbFindById,
  IPassCollectionDbFindByName,
  IPassCollectionDbUpdateData,
  IPassCollectionDbUpdateName,
} from 'src/types/passCollection.type';

interface IPassCollectionDbService {
  findAll(data: IPassCollectionDbFindAll): Promise<IPassCollection[]>;
  findById(data: IPassCollectionDbFindById): Promise<IPassCollection>;
  findByName(data: IPassCollectionDbFindByName): Promise<IPassCollection>;
  create(data: IPassCollectionDbCreate): Promise<IPassCollection>;
  updateName(data: IPassCollectionDbUpdateName): Promise<IPassCollection>;
  updateEncryptDate(data: IPassCollectionDbUpdateData): Promise<IPassCollection>;
  deleteById(data: IPassCollectionDbDeleteById): Promise<IPassCollection>;
  deleteAll(data: IPassCollectionDbDeleteAll): Promise<void>;
}

@Injectable()
export class PassCollectionDbService implements IPassCollectionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll({ userId }: IPassCollectionDbFindAll): Promise<IPassCollection[]> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );
    return passCollection;
  }

  public async findById({ id, userId }: IPassCollectionDbFindById): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findFirst({
        where: { id, userId },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async findByName({ userId, name }: IPassCollectionDbFindByName): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findFirst({
        where: { userId, name },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async create({ userId, name, version, encryptData }: IPassCollectionDbCreate): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.create({
        data: { userId, version, name, encryptData },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async updateName({ id, userId, name }: IPassCollectionDbUpdateName): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async updateEncryptDate({ id, userId, encryptData }: IPassCollectionDbUpdateData): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { encryptData },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async deleteById({ id, userId }: IPassCollectionDbDeleteById): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
    return !passCollection ? null : passCollection;
  }

  public async deleteAll({ userId }: IPassCollectionDbDeleteAll): Promise<void> {
    await handlerErrorDb(
      this.databaseService.passCollection.deleteMany({
        where: { userId },
      }),
    );
  }
}
