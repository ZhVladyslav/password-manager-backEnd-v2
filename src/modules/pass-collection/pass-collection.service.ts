import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PassCollectionDbService } from 'src/database/passCollection.db.service';
import { IPassCollection } from 'src/types/passCollection.type';

interface IService {
  id: string;
  userId: string;
  name: string;
  encryptData: string;
}

interface IAll extends Pick<IService, 'userId'> {}
interface IById extends Pick<IService, 'id' | 'userId'> {}
interface ICreate extends Pick<IService, 'userId' | 'name' | 'encryptData'> {}
interface IEditName extends Pick<IService, 'id' | 'userId' | 'name'> {}
interface IEditEncryptData extends Pick<IService, 'id' | 'userId' | 'encryptData'> {}
interface IDelete extends Pick<IService, 'id' | 'userId'> {}

interface IPassCollectionService {
  all(data: IAll): Promise<IPassCollection[]>;
  byId(data: IById): Promise<IPassCollection>;
  create(data: ICreate): Promise<{ message: string }>;
  editName(data: IEditName): Promise<{ message: string }>;
  editEncryptData(data: IEditEncryptData): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class PassCollectionService implements IPassCollectionService {
  constructor(private readonly passCollectionService: PassCollectionDbService) {}

  public async all({ userId }: IAll): Promise<IPassCollection[]> {
    return await this.passCollectionService.findAll({ userId });
  }

  public async byId({ id, userId }: IById): Promise<IPassCollection> {
    const passCollectionIdDb = await this.passCollectionService.findById({ id, userId });
    if (!passCollectionIdDb) throw new NotFoundException('Password collections not found');
    return passCollectionIdDb;
  }

  public async create({ userId, name, encryptData }: ICreate): Promise<{ message: string }> {
    const passCollectionInDb = await this.passCollectionService.findByName({ userId, name });
    if (passCollectionInDb) throw new BadRequestException('This name already is use');
    const newPassCollection = await this.passCollectionService.create({ userId, name, encryptData, version: 'v1' });
    return { message: 'Password collection is create' };
  }

  public async editName({ id, userId, name }: IEditName): Promise<{ message: string }> {
    const passCollectionInDb = await this.passCollectionService.findById({ id, userId });
    if (!passCollectionInDb) throw new NotFoundException('Password collection is not found');
    if (name === passCollectionInDb.name) throw new BadRequestException('This name is already set');
    const updatePassCollection = await this.passCollectionService.updateName({ id, userId, name });
    return { message: 'Password collection name is edit' };
  }

  public async editEncryptData({ id, userId, encryptData }: IEditEncryptData): Promise<{ message: string }> {
    const passCollectionInDb = await this.passCollectionService.findById({ id, userId });
    if (!passCollectionInDb) throw new NotFoundException('Password collection is not found');
    const updatePassCollection = await this.passCollectionService.updateEncryptDate({ id, userId, encryptData });
    return { message: 'Encrypt data in password collection is edit' };
  }

  public async delete({ id, userId }: IDelete): Promise<{ message: string }> {
    const passCollectionInDb = await this.passCollectionService.findById({ id, userId });
    if (!passCollectionInDb) throw new NotFoundException('Password collection is not found');
    const deletePassCollection = await this.passCollectionService.deleteById({ id, userId });
    return { message: 'Password collection is delete' };
  }
}
