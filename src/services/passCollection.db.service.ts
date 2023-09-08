import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IPassCollection } from 'src/types/passCollection.type';

interface IFindById extends Pick<IPassCollection, 'id' | 'userId'> {}
interface ICreate extends Pick<IPassCollection, 'userId' | 'version' | 'name' | 'encryptData'> {}
interface IUpdateName extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
interface IUpdateEncryptData extends Pick<IPassCollection, 'id' | 'userId' | 'encryptData'> {}
interface IDelete extends Pick<IPassCollection, 'id' | 'userId'> {}

/**
 * @ToDo
 * add update version
 */
interface IPassCollectionDbService {
  findById(data: IFindById): Promise<IPassCollection>;
  create(data: ICreate): Promise<IPassCollection>;
  updateName(data: IUpdateName): Promise<IPassCollection>;
  updateEncryptDate(data: IUpdateEncryptData): Promise<IPassCollection>;
  delete(data: IDelete): Promise<void>;
}

@Injectable()
export class PassCollectionDbService implements IPassCollectionDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findById({ id, userId }: IFindById): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.findFirst({ where: { id, userId } }),
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
      this.databaseService.passCollection.update({ where: { id, userId }, data: { name } }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async updateEncryptDate({ id, userId, encryptData }: IUpdateEncryptData): Promise<IPassCollection> {
    const passCollection = await handlerErrorDb(
      this.databaseService.passCollection.update({ where: { id, userId }, data: { encryptData } }),
    );
    if (!passCollection) return null;
    return passCollection;
  }

  public async delete({ id, userId }: IDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.passCollection.delete({ where: { id, userId } }));
  }
}
