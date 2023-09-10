import { InternalServerErrorException } from '@nestjs/common';

export const handlerErrorDb = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    throw new InternalServerErrorException('DB error');
  }
};
