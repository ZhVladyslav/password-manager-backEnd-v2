import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserConfigService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  // get all
  async getAllConfig(userId: string) {
    return await this.handleErrors(
      this.databaseService.config.findMany({
        where: { userId },
      }),
    );
  }

  // create
  async create(data: { userId: string; name: string; them: string }) {
    return await this.handleErrors(this.databaseService.config.create({ data }));
  }

  // edit
  async edit(data: { id: string; userId: string; name: string; them: string }) {
    return await this.handleErrors(
      this.databaseService.config.update({
        where: {
          id: data.id,
          userId: data.userId,
        },
        data: {
          name: data.name,
          them: data.them,
        },
      }),
    );
  }

  // delete
  async delete(data: { id: string; userId: string }) {
    return await this.handleErrors(
      this.databaseService.config.delete({
        where: {
          id: data.id,
          userId: data.userId,
        },
      }),
    );
  }
}
