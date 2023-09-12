import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';

interface IAuth {
  name: string;
  login: string;
  password: string;
}
interface ILogin extends Pick<IAuth, 'login' | 'password'> {}

interface IPassCollectionService {
  byId(): Promise<any>;
}

@Injectable()
export class PassCollectionService implements IPassCollectionService {
  constructor() {}

  public async byId(): Promise<any> {
    return { message: 'User is create' };
  }
}
