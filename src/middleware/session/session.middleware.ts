import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUserToken } from '../auth/auth.interface.middleware';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors(promise: Promise<unknown>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  // find session by session label
  async findSessionByLabel(tokenId: string) {
    return await this.handleErrors(
      this.databaseService.session.findFirst({
        where: { tokenId },
      }),
    );
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
