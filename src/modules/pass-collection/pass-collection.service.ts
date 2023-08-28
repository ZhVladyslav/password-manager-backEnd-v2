import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  /** */
  public async getAll({ userId }: { userId: string }): Promise<{ id: string; name: string }[]> {
    return await this.findAll({ userId });
  }

  /** */
  public async getById({ id, userId }: { id: string; userId: string }): Promise<{
    id: string;
    name: string;
    data: string;
  }> {
    const res = await this.findById({ id, userId });

    if (!res) throw new NotFoundException('Collection not found');

    return { id: res.id, name: res.name, data: res.data };
  }

  /* ----------------  POST  ---------------- */

  /** */
  public async create({ userId, name, data }: { userId: string; name: string; data: string }): Promise<{
    id: string;
  }> {
    const userListPassCollection = await this.findAll({ userId });

    for (const item of userListPassCollection) {
      if (item.name === name) throw new BadRequestException('The name is used');
    }

    const res = await this.createDb({ userId, name, data });

    return { id: res.id };
  }

  /* ----------------  PUT  ---------------- */

  /** */
  public async editName({ userId, id, name }: { userId: string; id: string; name: string }): Promise<{
    message: string;
  }> {
    const userListPassCollection = await this.findAll({ userId });
    let passCollectionIsExist: boolean = false;

    for (const item of userListPassCollection) {
      if (item.id === id) passCollectionIsExist = true;

      if (item.name === name) {
        if (item.id === id) throw new BadRequestException('The name is already set');
        if (item.id !== id) throw new BadRequestException('The name is used');
      }
    }

    if (!passCollectionIsExist) throw new BadRequestException('Collection not found');

    await this.editNameDb({ id, name, userId });

    return { message: 'Name is edit' };
  }

  /** */
  public async editData({ id, userId, data }: { id: string; userId: string; data: string }): Promise<{
    message: string;
  }> {
    const passCollection = await this.findById({ id, userId });

    if (!passCollection) throw new BadRequestException('Collection not found');

    await this.editDataDb({ id, userId, data });

    return { message: 'Data is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  /** */
  public async delete({ id, userId }: { id: string[]; userId: string }): Promise<{ message: string }> {
    if (id.length === 0) throw new BadRequestException('id not passed');

    let calculating = 0;

    const toDeleteArray = [...new Set(id)];
    const userListPassCollection = await this.findAll({ userId });

    for (const item of userListPassCollection) {
      if (!toDeleteArray.includes(item.id)) continue;
      calculating += 1;
      await this.deleteDb({ id: item.id, userId: userId });
    }

    if (id.length === 1) return { message: 'Pass collection is delete' };
    return { message: `Delete ${calculating} pass collections` };
  }

  // ----------------------------------------------------------------------
  // private methods
  // ----------------------------------------------------------------------

  /* ----------------  FIND  ---------------- */

  /** */
  private async findAll({ userId }: { userId: string }): Promise<{ id: string; name: string }[]> {
    if (!userId) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );

    return res.map((item) => {
      if (userId === item.userId) return { id: item.id, name: item.name };
    });
  }

  /** */
  private async findById({ id, userId }: { id: string; userId: string }): Promise<{
    id: string;
    name: string;
    data: string;
  }> {
    if (!userId || !id) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );

    if (res.userId === userId) return { id: res.id, name: res.name, data: res.data };
    return null;
  }

  /* ----------------  CREATE  ---------------- */

  /** */
  private async createDb({ userId, name, data }: { userId: string; name: string; data: string }): Promise<{
    id: string;
  }> {
    if (!userId || !name || !data) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.create({
        data: { userId, name, data },
      }),
    );

    return { id: res.id };
  }

  /* ----------------  EDIT  ---------------- */

  /** */
  private async editNameDb({ id, userId, name }: { id: string; userId: string; name: string }): Promise<void> {
    if (!id || !userId || !name) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
  }

  /** */
  private async editDataDb({ id, userId, data }: { id: string; userId: string; data: string }): Promise<void> {
    if (!id || !userId || !data) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { data },
      }),
    );
  }

  /* ----------------  DELETE  ---------------- */

  /** */
  private async deleteDb({ id, userId }: { id: string; userId: string }): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
  }
}
