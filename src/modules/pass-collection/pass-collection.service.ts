import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

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
  id: string[];
  userId: string;
}

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async getAll(userId: string) {
    const resList = await this.findAllByUserId(userId);
    return resList.map(({ id, name }) => ({ id, name }));
  }

  public async getById(userId: string, id: string) {
    const res = await this.findByPassId(userId, id);
    if (!res) throw new NotFoundException('Collection not found');
    return { id: res.id, name: res.name, data: res.data };
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreate) {
    await this.createInDatabase(data);
    return { message: 'passCollection is create' };
  }

  /* ----------------  PUT  ---------------- */

  public async editName(data: IEditName) {
    const passCollection = await this.findByPassId(data.userId, data.id);
    if (passCollection.name === data.name) throw new BadRequestException("The name is already set");
    await this.editNameInDatabase(data);
    return { message: 'Name is edit' };
  }

  public async editData(data: IEditData) {
    const passCollection = await this.findByPassId(data.userId, data.id);
    if (passCollection.data === data.data) throw new BadRequestException("The data is already set");
    await this.editDataInDatabase(data);
    return { message: 'Data is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  public async delete(data: IDelete) {
    if (data.id.length === 0) throw new BadRequestException('id not passed');
    const deleted = data.id.map(async (item) => {
      await this.deleteInDatabase({ id: item, userId: data.userId });
    });
    await Promise.all(deleted);
    if (data.id.length === 1) return { message: 'Pass collection is delete' };
    return { message: 'Pass collections is delete' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  // get all passCollection by user id
  private async findAllByUserId(userId: string) {
    if (!userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );
  }

  // get passCollection by id pass collection
  private async findByPassId(userId: string, id: string) {
    if (!userId || !id) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );
  }

  // add passCollection in database
  private async createInDatabase({ userId, name, data }: ICreate) {
    if (!userId || !name || !data) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.create({
        data: { userId, name, data },
      }),
    );
  }

  // edit name passCollection in database
  private async editNameInDatabase({ id, name, userId }: IEditName) {
    if (!id || !userId || !name) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
  }

  // edit data passCollection in database
  private async editDataInDatabase({ id, userId, data }: IEditData) {
    if (!id || !userId || !data) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { data },
      }),
    );
  }

  // delete passCollection in database
  private async deleteInDatabase({ id, userId }: { id: string; userId: string }) {
    if (!id || !userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
  }
}
