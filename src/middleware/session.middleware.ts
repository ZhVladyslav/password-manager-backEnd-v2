import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { SessionDbService } from 'src/database/session.db.service';
import { IUserToken } from 'src/types/userToken.type';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly sessionDbService: SessionDbService) {}

  async use(req: any, res: any, next: () => void) {
    // get userToken
    const { sessionId, userId, tokenId } = req['userToken'] as IUserToken;

    // find user session
    const resFindSession = await this.sessionDbService.findByTokenId({ tokenId });
    if (!resFindSession) throw new NotFoundException('Session not found');

    // add expire session

    next();
  }
}
