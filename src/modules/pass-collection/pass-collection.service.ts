import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

/* ----------------  INTERFACES  ---------------- */

interface IPassCollection {
  userId: string;
  id: string;
  name: string;
  data: string;
}

export interface IRes {
  message: string;
}

// Service

// Get all
interface IGetAllReq extends Pick<IPassCollection, 'userId'> {} // { userId }
export interface IGetAllRes extends Pick<IPassCollection, 'id' | 'name'> {} // { id, name };
// Get by id
interface IGetByIdReq extends Pick<IPassCollection, 'id' | 'userId'> {} // { id, userId }
export interface IGetByIdRes extends Pick<IPassCollection, 'id' | 'name' | 'data'> {} // { id, name, data }
// Create
interface ICreateReq extends Omit<IPassCollection, 'id'> {} // { userId, name, data }
export interface ICreateRes extends Pick<IPassCollection, 'id'> {} // { id }
// Edit name
interface IEditNameReq extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {} // { id, userId, name }
// Edit data
interface IEditDataReq extends Pick<IPassCollection, 'id' | 'userId' | 'data'> {} // { id, userId, data }
// Delete
interface IDeleteReq extends Pick<IPassCollection, 'userId'> {
  // { id, userId }
  id: string[];
}

// DB

// Find all
interface IDbFindAllReq extends Pick<IPassCollection, 'userId'> {} // { userId }
interface IDbFindAllRes extends Pick<IPassCollection, 'id' | 'name'> {} // { id, name };
// Find by id
interface IDbFindByIdReq extends Pick<IPassCollection, 'id' | 'userId'> {} // { id, userId }
interface IDbFindByIdRes extends Pick<IPassCollection, 'id' | 'name' | 'data'> {} // { id, name, data };
// Create
interface IDbCreateReq extends Pick<IPassCollection, 'userId' | 'name' | 'data'> {} // { userId, name, data }
interface IDbCreateRes extends Pick<IPassCollection, 'id'> {} // { id };
// Edit name
interface IDbEditNameReq extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {} // { id, userId, name }
// Edit data
interface IDbEditDataReq extends Pick<IPassCollection, 'id' | 'userId' | 'data'> {} // { id, userId, data }
// Delete
interface IDbDeleteReq extends Pick<IPassCollection, 'id' | 'userId'> {} // { id, userId }
/* ----------------  SERVICE  ---------------- */

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  /**
   @------------- req -----------------
    @userId string;
   @------------- res [ ] -----------------
    @id string;
    @name string;
  */
  public async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    return await this.findAll({ userId });
  }

  /**
   @------------- req -----------------
    @id string;
    @userId string;
   @------------- res -----------------
    @id string;
    @name string;
    @data string;
  */
  public async getById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    const res = await this.findById({ id, userId });

    if (!res) throw new NotFoundException('Collection not found');

    return { id: res.id, name: res.name, data: res.data };
  }

  /* ----------------  POST  ---------------- */

  /**
   @------------- req -----------------
    @userId string;
    @name string;
    @data string;
   @------------- res -----------------
    @id string;
  */
  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    const userListPassCollection = await this.findAll({ userId });

    for (const item of userListPassCollection) {
      if (item.name === name) throw new BadRequestException('The name is used');
    }

    const res = await this.createDb({ userId, name, data });

    return { id: res.id };
  }

  /* ----------------  PUT  ---------------- */

  /**
   @------------- req -----------------
    @id string;
    @userId string;
    @name string;
   @------------- res -----------------
    @message string;
  */
  public async editName({ userId, id, name }: IEditNameReq): Promise<IRes> {
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

  /**
   @------------- req -----------------
    @id string;
    @userId string;
    @data string;
   @------------- res -----------------
    @message string;
  */
  public async editData({ id, userId, data }: IEditDataReq): Promise<IRes> {
    const passCollection = await this.findById({ id, userId });

    if (!passCollection) throw new BadRequestException('Collection not found');

    await this.editDataDb({ id, userId, data });

    return { message: 'Data is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  /**
   @------------- req -----------------
    @id string;
    @userId string;
   @------------- res -----------------
    @message string;
  */
  public async delete({ id, userId }: IDeleteReq): Promise<IRes> {
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

  /**
   @------------- req -----------------
    @userId string;
   @------------- res -----------------
    @id string;
    @name string;
  */
  private async findAll({ userId }: IDbFindAllReq): Promise<IDbFindAllRes[]> {
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

  /**
   @------------- req -----------------
    @id string;
    @userId string;
   @------------- res -----------------
    @id string;
    @name string;
    @data string;
  */
  private async findById({ id, userId }: IDbFindByIdReq): Promise<IDbFindByIdRes> {
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

  /**
   @------------- req -----------------
    @userId string;
    @name string;
    @data string;
   @------------- res -----------------
    @id string;
  */
  private async createDb({ userId, name, data }: IDbCreateReq): Promise<IDbCreateRes> {
    if (!userId || !name || !data) throw new BadRequestException();

    const res = await handlers.dbError(
      this.databaseService.passCollection.create({
        data: { userId, name, data },
      }),
    );

    return { id: res.id };
  }

  /* ----------------  EDIT  ---------------- */

  /**
   @------------- req -----------------
    @id string;
    @userId string;
    @name string;
   @------------- res -----------------
    @void
  */
  private async editNameDb({ id, userId, name }: IDbEditNameReq): Promise<void> {
    if (!id || !userId || !name) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { name },
      }),
    );
  }

  /**
   @------------- req -----------------
    @id string;
    @userId string;
    @data string;
   @------------- res -----------------
    @void
  */
  private async editDataDb({ id, userId, data }: IDbEditDataReq): Promise<void> {
    if (!id || !userId || !data) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.update({
        where: { id, userId },
        data: { data },
      }),
    );
  }

  /* ----------------  DELETE  ---------------- */

  /**
   @------------- req -----------------
    @id string;
    @userId string;
   @------------- res -----------------
    @void
  */
  private async deleteDb({ id, userId }: IDbDeleteReq): Promise<void> {
    if (!id || !userId) throw new BadRequestException();

    await handlers.dbError(
      this.databaseService.passCollection.delete({
        where: { id, userId },
      }),
    );
  }
}
