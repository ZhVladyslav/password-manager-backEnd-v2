import { InternalServerErrorException } from '@nestjs/common';

class Handlers {
  public async dbError<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }
}

export const handlers = new Handlers();
