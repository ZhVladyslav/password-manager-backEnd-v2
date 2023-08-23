import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

interface ICreate {
  userId: string;
  name: string;
  data: string;
}

interface IEditName {
  userId: string;
  id: string;
  name: string;
}

interface IEditData {
  userId: string;
  id: string;
  data: string;
}

interface IDelete {
  id: string;
  userId: string;
}

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async getAll(userId: string) {
    return await this.findAllByUserId(userId);
  }

  public async getById(userId: string, id: string) {
    return await this.findByPassId(userId, id);
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreate) {
    return await this.createInDatabase(data);
  }

  /* ----------------  PUT  ---------------- */

  public async editName(data: IEditName) {
    return await this.editNameInDatabase(data);
  }

  public async editData(data: IEditData) {
    return await this.editDataInDatabase(data);
  }

  /* ----------------  DELETE  ---------------- */

  public async delete(data: IDelete) {
    return await this.deleteInDatabase(data);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  // get all passCollection by user id
  private async findAllByUserId(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );
  }

  // get passCollection by id pass collection
  private async findByPassId(userId: string, id: string) {
    return await databaseHandler.errors(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );
  }

  // add passCollection in database
  private async createInDatabase(data: ICreate) {
    return await databaseHandler.errors(this.databaseService.passCollection.create({ data }));
  }

  // edit name passCollection in database
  private async editNameInDatabase({ id, name }: IEditName) {
    return await databaseHandler.errors(
      this.databaseService.passCollection.update({
        where: { id },
        data: { name },
      }),
    );
  }

  // edit data passCollection in database
  private async editDataInDatabase({ id, data }: IEditData) {
    return await databaseHandler.errors(
      this.databaseService.passCollection.update({
        where: { id },
        data: { data },
      }),
    );
  }

  // delete passCollection in database
  private async deleteInDatabase({ id, userId }: IDelete) {
    return await databaseHandler.errors(
      this.databaseService.passCollection.delete({
        where: {
          id,
          userId,
        },
      }),
    );
  }
}
