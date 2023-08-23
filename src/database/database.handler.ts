import { InternalServerErrorException } from '@nestjs/common';

class DatabaseHandler {
  public async errors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }
}

export const databaseHandler = new DatabaseHandler()