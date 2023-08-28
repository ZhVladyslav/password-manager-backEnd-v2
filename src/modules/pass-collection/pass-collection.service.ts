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

    return resList.map((item) => {
      if (userId === item.userId) return { id: item.id, name: item.name };
    });
  }

  public async getById(userId: string, id: string) {
    const res = await this.findByPassId(userId, id);

    if (!res) throw new NotFoundException('Collection not found');
    if (res.userId !== userId) throw new NotFoundException('Collection not found');

    return { id: res.id, name: res.name, data: res.data };
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreate) {
    const userListPassCollection = await this.findAllByUserId(data.userId);

    for (const item of userListPassCollection) {
      if (item.userId !== data.userId) continue;

      if (item.name === data.name) throw new BadRequestException('The name is used');
    }

    await this.createInDatabase(data);
    return { message: 'passCollection is create' };
  }

  /* ----------------  PUT  ---------------- */

  public async editName(data: IEditName) {
    const userListPassCollection = await this.findAllByUserId(data.userId);
    let passCollectionIsExist: boolean = false;

    for (const item of userListPassCollection) {
      if (item.userId !== data.userId) continue;
      if (item.id === data.id) passCollectionIsExist = true;

      if (item.name === data.name) {
        if (item.id === data.id) throw new BadRequestException('The name is already set');
        if (item.id !== data.id) throw new BadRequestException('The name is used');
      }
    }

    if (!passCollectionIsExist) throw new BadRequestException('Collection not found');

    await this.editNameInDatabase(data);
    return { message: 'Name is edit' };
  }

  public async editData(data: IEditData) {
    const passCollection = await this.findByPassId(data.userId, data.id);

    if (!passCollection) throw new BadRequestException('Collection not found');
    if (passCollection.userId !== data.userId) throw new BadRequestException('Collection not found');

    await this.editDataInDatabase(data);
    return { message: 'Data is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  public async delete(data: IDelete) {
    if (data.id.length === 0) throw new BadRequestException('id not passed');
    const toDeleteArray = [...new Set(data.id)];
    const userListPassCollection = await this.findAllByUserId(data.userId);

    for (const item of userListPassCollection) {
      if (!toDeleteArray.includes(item.id)) continue;
      if (item.userId !== data.userId) continue;

      await this.deleteInDatabase({ id: item.id, userId: data.userId });
    }

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
