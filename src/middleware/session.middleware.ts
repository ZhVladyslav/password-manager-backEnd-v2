import { Injectable, NestMiddleware, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IUserToken } from 'src/types/userToken.type';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  // find session by session label
  async findSessionByLabel(tokenId: string) {
    return await handlerErrorDb(this.databaseService.session.findFirst({ where: { tokenId } }));
  }

  // ----------------------------------------------------------------------

  //
  // MIDDLEWARE
  //

  // ----------------------------------------------------------------------

  async use(req: any, res: any, next: () => void) {
    // get userToken
    const userToken = req['userToken'] as IUserToken;

    // find tokenId in token
    if (!('tokenId' in userToken)) throw new BadRequestException('Invalid token');

    // find user session
    const resFindSession = await this.findSessionByLabel(userToken.tokenId);
    if (!resFindSession) throw new NotFoundException('Session not found');

    next();
  }
}
