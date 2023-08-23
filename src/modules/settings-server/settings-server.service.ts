import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SettingsServerService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async addAdmin(userId: string) {
    return await this.addAdminInDatabase(userId);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async addAdminInDatabase(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.user.update({
        where: { id: userId },
        data: { roleId: 'ADMIN' },
      }),
    );
  }
}
