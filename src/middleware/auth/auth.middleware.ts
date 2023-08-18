import { Injectable, NestMiddleware, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];

      // check authorization header
      if (typeof authHeader !== 'string') throw new UnauthorizedException('User in not authorization');
      if (!authHeader) throw new UnauthorizedException('User in not authorization');

      // check user token
      const userToken = jwt.verify(authHeader, process.env.JWT_KEY);

      // Write user token in request
      req['userToken'] = userToken;

      next();
    } catch (err) {
      throw new BadRequestException('Invalid request');
    }
  }
}
