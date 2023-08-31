import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { ICreateReq, IDeleteReq, IEditReq, IGetAllRes, IGetByIdReq, IGetByIdRes } from './role.type';

interface IRoleDbService {
  findAll(): Promise<IGetAllRes[]>;
  findById(data: IGetByIdReq): Promise<IGetByIdRes>;
  create(data: ICreateReq): Promise<void>;
  edit(data: IEditReq): Promise<void>;
  delete(data: IDeleteReq): Promise<void>;
}

@Injectable()
export class RoleDbService implements IRoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findAll(): Promise<IGetAllRes[]> {
    return await handlerErrorDb(this.databaseService.role.findMany());
  }

  public async findById({ id }: IGetByIdReq): Promise<IGetByIdRes> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { id } }));
    const claims = await handlerErrorDb(this.databaseService.claim.findMany({ where: { roleId: id } }));
    const claimsToRes = claims.map((item) => ({ id: item.id, name: item.name }));
    return { id: role.id, name: role.name, claims: claimsToRes };
  }

  public async create({ name, claims }: ICreateReq): Promise<void> {
    const newRole = await handlerErrorDb(this.databaseService.role.create({ data: { name } }));
    const newClaims = claims.map(async (claimName) => {
      return await handlerErrorDb(this.databaseService.claim.create({ data: { roleId: newRole.id, name: claimName } }));
    });
    await Promise.all(newClaims);
  }

  public async edit({ id, name, claims }: IEditReq): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId: id } }));
    const newClaims = claims.map(async (claimName) => {
      return await handlerErrorDb(this.databaseService.claim.create({ data: { roleId: id, name: claimName } }));
    });
    await Promise.all(newClaims);
    await handlerErrorDb(this.databaseService.role.update({ where: { id }, data: { name } }));
  }

  public async delete({ id, newRoleId = null }: IDeleteReq): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId: id } }));
    await handlerErrorDb(this.databaseService.user.updateMany({ where: { roleId: id }, data: { roleId: newRoleId } }));
    await handlerErrorDb(this.databaseService.role.delete({ where: { id } }));
  }
}
