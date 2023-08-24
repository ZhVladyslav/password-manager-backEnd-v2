import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (err) {
      const { message, errors, statusCode } = err.response;
      res.status(statusCode).json({ message, errors, statusCode });
    }
  }
}
