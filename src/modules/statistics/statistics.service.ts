import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async userList() {
    return await this.userListInDatabase();
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async userListInDatabase() {
    const res = await databaseHandler.errors(this.databaseService.user.findMany());
    return res.map(({ id, login, name, roleId }) => ({ id, login, name, roleId }));
  }
}
