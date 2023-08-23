import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

interface ICreate {
  userId: string;
  name: string;
  them: string;
}

interface IEdit {
  id: string;
  userId: string;
  name: string;
  them: string;
}

interface IDelete {
  id: string;
  userId: string;
}

@Injectable()
export class UserConfigService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async getAll(userId: string) {
    return await this.getAllInDb(userId);
  }

  /* ----------------  POST  ---------------- */

  async create(data: ICreate) {
    return await this.createInDb(data);
  }

  /* ----------------  PUT  ---------------- */

  async edit(data: IEdit) {
    return await this.editInDb(data);
  }

  /* ----------------  DELETE  ---------------- */

  async delete({ id, userId }: IDelete) {
    return await this.deleteInDb({ id, userId });
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async getAllInDb(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.config.findMany({
        where: { userId },
      }),
    );
  }

  private async createInDb(data: ICreate) {
    return await databaseHandler.errors(this.databaseService.config.create({ data }));
  }

  private async editInDb(data: IEdit) {
    return await databaseHandler.errors(
      this.databaseService.config.update({
        where: { id: data.id, userId: data.userId },
        data: { name: data.name, them: data.them },
      }),
    );
  }

  private async deleteInDb(data: IDelete) {
    return await databaseHandler.errors(
      this.databaseService.config.delete({
        where: { id: data.id, userId: data.userId },
      }),
    );
  }
}
