import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

export interface IRole {
  id: string;
  name: string;
  claims: string[];
}

export interface IClaim {
  id: string;
  roleId: string;
  name: string;
}

// REQ
interface IGetByIdReq extends Pick<IRole, 'id'> {}
interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
interface IEditReq extends IRole {}
interface IDeleteReq extends Pick<IRole, 'id'> {}

// RES
interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}
interface IGetByIdRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaim[];
}

// SERVICE

@Injectable()
export class RoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  // get all roles
  public async findAll(): Promise<IGetAllRes[]> {
    return await handlers.dbError(this.databaseService.role.findMany());
  }

  // get role by id
  public async findById({ id }: IGetByIdReq): Promise<IGetByIdRes> {
    if (!id) throw new BadRequestException();

    // get role
    const role = await handlers.dbError(this.databaseService.role.findFirst({ where: { id } }));

    // get claims
    const claims = await handlers.dbError(this.databaseService.claim.findMany({ where: { roleId: id } }));

    return {
      id: role.id,
      name: role.name,
      claims: claims.map((item) => {
        return { id: item.id, roleId: item.roleId, name: item.name };
      }),
    };
  }

  // create role
  public async create({ name, claims }: ICreateReq): Promise<void> {
    if (!name) throw new BadRequestException();

    const newRole = await handlers.dbError(this.databaseService.role.create({ data: { name } }));

    // create claims
    const newClaims = claims.map(async (claimName) => {
      return await handlers.dbError(
        this.databaseService.claim.create({ data: { roleId: newRole.id, name: claimName } }),
      );
    });

    await Promise.all(newClaims);
  }

  // edit role
  public async edit({ id, name, claims }: IEditReq): Promise<void> {
    if (!id || !name) throw new BadRequestException();

    // delete claims
    await handlers.dbError(this.databaseService.claim.deleteMany({ where: { roleId: id } }));

    // create new claims
    const newClaims = claims.map(async (claimName) => {
      return await handlers.dbError(this.databaseService.claim.create({ data: { roleId: id, name: claimName } }));
    });

    await Promise.all(newClaims);

    // edit role
    await handlers.dbError(this.databaseService.role.update({ where: { id }, data: { name } }));
  }

  // delete role
  public async delete({ id }: IDeleteReq): Promise<void> {
    if (!id) throw new BadRequestException();

    // delete claims
    await handlers.dbError(this.databaseService.claim.deleteMany({ where: { roleId: id } }));

    // delete role with users
    await handlers.dbError(this.databaseService.user.updateMany({ where: { roleId: id }, data: { roleId: null } }));

    // delete role
    await handlers.dbError(this.databaseService.role.delete({ where: { id } }));
  }
}
