import {
  Injectable,
  NestMiddleware,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IUserToken } from '../auth/auth.interface.middleware';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  // find session by session label
  async findUser(id: string) {
    return await this.handleErrors(this.databaseService.user.findFirst({ where: { id } }));
  }

  // ----------------------------------------------------------------------

  //
  // MIDDLEWARE
  //

  // ----------------------------------------------------------------------

  async use(req: Request, res: Response, next: () => void) {
    // get userToken
    const userToken = req['userToken'] as IUserToken;

    // find user session
    const resFindUser = await this.findUser(userToken.userId);
    if (!resFindUser) throw new NotFoundException('User not found');

    if (resFindUser.role !== 'ADMIN') throw new ForbiddenException('Access error');

    next();
  }
}
