import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SessionDbService } from 'src/database/session.db.service';
import { ISession } from 'src/types/session.type';

interface IService {
  id: string;
  userId: string;
}

interface IAll extends Pick<IService, 'userId'> {}
interface IById extends Pick<IService, 'id' | 'userId'> {}
interface IDelete extends Pick<IService, 'id' | 'userId'> {}

interface ISessionService {
  getAll(data: IAll): Promise<ISession[]>;
  getById(data: IById): Promise<ISession>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionService: SessionDbService) {}

  public async getAll({ userId }: IAll): Promise<ISession[]> {
    return await this.sessionService.findAll({ userId });
  }

  public async getById({ id, userId }: IById): Promise<ISession> {
    const sessionInDb = await this.sessionService.findById({ id, userId });
    if (!sessionInDb) throw new NotFoundException('Session is not found');
    return sessionInDb;
  }

  public async delete({ id, userId }: IDelete): Promise<{ message: string }> {
    await this.getById({ id, userId });
    await this.sessionService.deleteById({ id, userId });
    return { message: 'Session is delete' };
  }
}
