import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';

interface IService {
  id: string;
  userId: string;
}

interface IAll extends Pick<IService, 'userId'> {}
interface IById extends Pick<IService, 'id' | 'userId'> {}
interface IDelete extends Pick<IService, 'id' | 'userId'> {}

interface ISessionService {
  all(data: IAll): Promise<any>;
  byId(data: IById): Promise<any>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionService: SessionService) {}

  public async all({ userId }: IAll): Promise<any> {
    return '';
  }

  public async byId({ id, userId }: IById): Promise<any> {
    return '';
  }

  public async delete({ id, userId }: IDelete): Promise<{ message: string }> {
    return { message: '' };
  }
}
