import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { IPassCollection } from 'src/types/passCollection.type';

interface IService {
  id: string;
  userId: string;
  tokenId: string;
}

interface IAll extends Pick<IService, 'userId'> {}

interface ISessionService {
  all(data: IAll): Promise<IPassCollection[]>;
}

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionService: SessionService) {}

  public async all({ userId }: IAll): Promise<IPassCollection[]> {
    return await this.sessionService.all({ userId });
  }
}
