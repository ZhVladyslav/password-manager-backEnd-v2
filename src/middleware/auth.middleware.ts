import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUserToken } from '../types/userToken.type';
import { jwt } from 'src/utils/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) throw new UnauthorizedException('User is not authorized');
      if (typeof authHeader !== 'string') throw new UnauthorizedException('User is not authorized');

      // check user token
      const userToken = jwt.verify(authHeader);

      // Write user token in request
      req['userToken'] = userToken as IUserToken;

      next();
    } catch (err) {
      if (err.constructor.name === 'JsonWebTokenError') {
        res.status(400).json({
          message: 'Invalid token',
          error: 'Bad Request',
          statusCode: 400,
        });
        return;
      }

      res.status(err.response.statusCode).json({
        message: err.response.message,
        error: err.response.error,
        statusCode: err.response.statusCode,
      });
    }
  }
}
