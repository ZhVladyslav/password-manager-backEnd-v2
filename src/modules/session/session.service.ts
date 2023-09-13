import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionDbService } from 'src/database/session.db.service';

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
  constructor(private readonly sessionService: SessionDbService) {}

  public async all({ userId }: IAll): Promise<any> {
    return await this.sessionService.findAll({ userId });
  }

  public async byId({ id, userId }: IById): Promise<any> {
    return await this.sessionService.findById({ id, userId });
  }

  public async delete({ id, userId }: IDelete): Promise<{ message: string }> {
    await this.sessionService.deleteById({ id, userId });
    return { message: 'Session is delete' };
  }
}
