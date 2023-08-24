import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

@Injectable()
export class SettingsServerService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async addAdmin(userId: string) {
    await this.addAdminInDatabase(userId);
    return { message: 'Admin user add' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async addAdminInDatabase(userId: string) {
    if (!userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.user.update({
        where: { id: userId },
        data: { roleId: 'ADMIN' },
      }),
    );
  }
}
