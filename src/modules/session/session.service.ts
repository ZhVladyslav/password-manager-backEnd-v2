import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(userId: string) {
    return await this.getAllInDatabase(userId);
  }

  async delete(id: string, userId: string) {
    return await this.deleteInDatabase(id, userId);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async getAllInDatabase(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.session.findMany({
        where: { userId },
      }),
    );
  }

  private async deleteInDatabase(id: string, userId: string) {
    return await databaseHandler.errors(
      this.databaseService.session.delete({
        where: { id, userId },
      }),
    );
  }
}
