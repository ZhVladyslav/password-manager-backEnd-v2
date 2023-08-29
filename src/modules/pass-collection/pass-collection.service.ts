import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { IPassCollection, PassCollectionDbService } from './pass-collection.db.service';

export interface IRes {
  message: string;
}

// REQ
interface IGetAllReq extends Pick<IPassCollection, 'userId'> {}
interface IGetByIdReq extends Pick<IPassCollection, 'id' | 'userId'> {}
interface ICreateReq extends Pick<IPassCollection, 'userId' | 'name' | 'data'> {}
interface IEditNameReq extends Pick<IPassCollection, 'id' | 'userId' | 'name'> {}
interface IEditDataReq extends Pick<IPassCollection, 'id' | 'userId' | 'data'> {}
interface IDeleteReq extends Pick<IPassCollection, 'userId'> {
  id: string[];
}

// RES
export interface IGetAllRes extends Pick<IPassCollection, 'id' | 'name'> {}
export interface IGetByIdRes extends Pick<IPassCollection, 'id' | 'name' | 'data'> {}
export interface ICreateRes extends Pick<IPassCollection, 'id'> {}

// SERVICE

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: PassCollectionDbService) {}

  /* ----------------  GET  ---------------- */

  /** */
  public async getAll({ userId }: IGetAllReq): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll({ userId });
  }

  /** */
  public async getById({ id, userId }: IGetByIdReq): Promise<IGetByIdRes> {
    const res = await this.databaseService.findById({ id, userId });

    if (!res) throw new NotFoundException('Collection not found');

    return { id: res.id, name: res.name, data: res.data };
  }

  /* ----------------  POST  ---------------- */

  /** */
  public async create({ userId, name, data }: ICreateReq): Promise<ICreateRes> {
    const userListPassCollection = await this.databaseService.findAll({ userId });

    for (const item of userListPassCollection) {
      if (item.name === name) throw new BadRequestException('The name is used');
    }

    const res = await this.databaseService.create({ userId, name, data });

    return { id: res.id };
  }

  /* ----------------  PUT  ---------------- */

  /** */
  public async editName({ userId, id, name }: IEditNameReq): Promise<IRes> {
    const userListPassCollection = await this.databaseService.findAll({ userId });
    let passCollectionIsExist: boolean = false;

    for (const item of userListPassCollection) {
      if (item.id === id) passCollectionIsExist = true;

      if (item.name === name) {
        if (item.id === id) throw new BadRequestException('The name is already set');
        if (item.id !== id) throw new BadRequestException('The name is used');
      }
    }

    if (!passCollectionIsExist) throw new BadRequestException('Collection not found');

    await this.databaseService.editName({ id, name, userId });

    return { message: 'Name is edit' };
  }

  /** */
  public async editData({ id, userId, data }: IEditDataReq): Promise<IRes> {
    const passCollection = await this.databaseService.findById({ id, userId });

    if (!passCollection) throw new BadRequestException('Collection not found');

    await this.databaseService.editData({ id, userId, data });

    return { message: 'Data is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  /** */
  public async delete({ id, userId }: IDeleteReq): Promise<IRes> {
    if (id.length === 0) throw new BadRequestException('id not passed');

    let calculating = 0;

    const toDeleteArray = [...new Set(id)];
    const userListPassCollection = await this.databaseService.findAll({ userId });

    for (const item of userListPassCollection) {
      if (!toDeleteArray.includes(item.id)) continue;
      calculating += 1;
      await this.databaseService.delete({ id: item.id, userId: userId });
    }

    if (id.length === 1) return { message: 'Pass collection is delete' };
    return { message: `Delete ${calculating} pass collections` };
  }
}
