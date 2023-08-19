import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  async getAll(userId: string) {
    return await this.handleErrors(
      this.databaseService.session.findMany({
        where: { userId },
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  async delete(userId: string, id: string) {
    return await this.handleErrors(
      this.databaseService.session.delete({
        where: { id, userId },
      }),
    );
  }
}
