import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
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
  constructor(private readonly passCollectionService: PassCollectionService) {}

  public async all({ userId }: IAll): Promise<IPassCollection[]> {
    return await this.passCollectionService.all({ userId });
  }

  public async byId({ id, userId }: IById): Promise<IPassCollection> {
    return await this.passCollectionService.byId({ id, userId });
  }

  public async create({ userId, name, encryptData }: ICreate): Promise<{ message: string }> {
    return { message: 'Password collection is create' };
  }

  public async editName({ id, userId, name }: IEditName): Promise<{ message: string }> {
    return { message: 'Password collection name is edit' };
  }

  public async editEncryptData({ id, userId, encryptData }: IEditEncryptData): Promise<{ message: string }> {
    return { message: 'Encrypt data in password collection is edit' };
  }

  public async delete({ id, userId }: IDelete): Promise<{ message: string }> {
    return { message: 'Password collection is delete' };
  }
}
