import { Injectable, NestMiddleware, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { IUserToken } from './auth.interface.middleware';
import { jwt } from 'src/config/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];

      // check authorization header
      if (typeof authHeader !== 'string') throw new UnauthorizedException('User in not authorization');
      if (!authHeader) throw new UnauthorizedException('User in not authorization');

      // check user token
      const userToken = jwt.verify(authHeader);

      // Write user token in request
      req['userToken'] = userToken as IUserToken;

      // find userId in token
      if (!('userId' in req['userToken'])) throw new BadRequestException('Invalid token');

      next();
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }
}
