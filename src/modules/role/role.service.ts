import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Claims } from 'src/config/claims';
import { IClaim, IRole, RoleDbService } from './role.db.service';

// REQ
interface IGetByIdReq extends Pick<IRole, 'id'> {}
interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
interface IEditReq extends IRole {}
interface IDeleteReq extends Pick<IRole, 'id'> {}

// RES
export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
export interface IGetByIdRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaim[];
}
export interface IRes {
  message: string;
}

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: RoleDbService) {}

  /* ----------------  GET  ---------------- */

  public async getAll(): Promise<IGetAllRes[]> {
    return await this.databaseService.findAll();
  }

  public async getById({ id }: IGetByIdReq): Promise<IGetByIdRes> {
    if (!id) throw new BadRequestException();

    return await this.databaseService.findById({ id });
  }

  /* ----------------  POST  ---------------- */

  public async create({ name, claims }: ICreateReq): Promise<IRes> {
    if (!name) throw new BadRequestException();

    await this.databaseService.create({ name, claims });

    return { message: 'Role is create' };
  }

  /* ----------------  PUT  ---------------- */

  public async edit({ id, name, claims }: IEditReq): Promise<IRes> {
    const serverClaims = Object.keys(Claims).map((item) => Claims[item]);

    for (const claimName of claims) {
      if (!serverClaims.includes(claimName)) throw new BadRequestException('Invalid claim or claims');
    }

    await this.databaseService.edit({ id, name, claims });

    return { message: 'role is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  public async delete({ id }: IDeleteReq): Promise<IRes> {
    const findRole = this.databaseService.findById({ id });
    if (!findRole) throw new NotFoundException('Role not found');

    await this.databaseService.delete({ id });

    return { message: 'Role is delete' };
  }
}
