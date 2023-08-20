import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SettingsServerService {
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

  // addAdmin
  async addAdmin(id: string) {
    return await this.handleErrors(
      this.databaseService.user.update({
        where: { id },
        data: { role: 'ADMIN' },
      }),
    );
  }
}
