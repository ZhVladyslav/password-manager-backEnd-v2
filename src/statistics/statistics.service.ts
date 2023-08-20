import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatisticsService {
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

  // userList
  async userList() {
    const res = await this.handleErrors(this.databaseService.user.findMany());
    return res.map(({ id, login, name, role }) => ({ id, login, name, role }));
  }
}
