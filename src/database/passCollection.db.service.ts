import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { IPassCollection } from 'src/types/passCollection.type';

interface IFindAll extends Pick<IPassCollection, 'userId'> {}
interface IFindById extends Pick<IPassCollection, 'id' | 'userId'> {}
interface IFindByName extends Pick<IPassCollection, 'userId' | 'name'> {}
interface ICreate extends Pick<IPassCollection, 'userId' | 'version' | 'name' | 'encryptData'> {}
interface IUpdateName extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
interface IUpdateEncryptData extends Pick<IPassCollection, 'id' | 'userId' | 'encryptData'> {}
interface IDeleteById extends Pick<IPassCollection, 'id' | 'userId'> {}
interface IDeleteAll extends Pick<IPassCollection, 'userId'> {}

/**
 * @ToDo
 * add update version
 */
interface IPassCollectionDbService {
  findAll(data: IFindAll): Promise<IPassCollection[]>;
  findById(data: IFindById): Promise<IPassCollection>;
  findByName(data: IFindByName): Promise<IPassCollection>;
  create(data: ICreate): Promise<IPassCollection>;
  updateName(data: IUpdateName): Promise<IPassCollection>;
  updateEncryptDate(data: IUpdateEncryptData): Promise<IPassCollection>;
  deleteById(data: IDeleteById): Promise<IPassCollection>;
  deleteAll(data: IDeleteAll): Promise<void>;
}

@Injectable()
export class PassCollectionDbService implements IPassCollectionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll({ userId }: IFindAll): Promise<IPassCollection[]> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );
    return passCollection;
  }

  public async findById({ id, userId }: IFindById): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findFirst({
        where: { id, userId },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async findByName({ userId, name }: IFindByName): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findFirst({
        where: { userId, name },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async create({ userId, name, version, encryptData }: ICreate): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.create({
        data: { userId, version, name, encryptData },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async updateName({ id, userId, name }: IUpdateName): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async updateEncryptDate({ id, userId, encryptData }: IUpdateEncryptData): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { encryptData },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async deleteById({ id, userId }: IDeleteById): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async deleteAll({ userId }: IDeleteAll): Promise<void> {
    await handlerErrorDb(
      this.databaseService.passCollection.deleteMany({
        where: { userId },
      }),
    );
  }
}
