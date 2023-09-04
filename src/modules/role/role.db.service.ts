import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IClaim, IRole } from 'src/types/role.type';

interface IClaimsInRoleRes extends Pick<IClaim, 'id' | 'name'> {}

export interface IClaimsToRoleRes {
  claims: IClaimsInRoleRes[];
}

export interface IFindByRoleId extends Pick<IRole, 'id'> {}
export interface IFindByRoleName extends Pick<IRole, 'name'> {}
export interface IEditRole extends Pick<IRole, 'name' | 'claims'> {}
export interface IRoleRes extends Pick<IRole, 'id' | 'name'> {}
export interface IClaimsToRole extends Pick<IClaim, 'roleId'> {}
export interface ICreateClaimToRole extends Pick<IClaim, 'roleId' | 'name'> {}
export interface IDeleteRole extends Pick<IRole, 'id'> {}
export interface IDeleteAllClaims extends Pick<IClaim, 'roleId'> {}
//
//
//

export interface IGetByNameReq extends Pick<IRole, 'name'> {}
export interface ICreateReq extends Pick<IRole, 'name' | 'claims'> {}
export interface IEditReq extends IRole {}
export interface IDeleteReq extends Pick<IRole, 'id'> {
  newRoleId: string | null;
}
export interface IGetAllRes extends Pick<IRole, 'id' | 'name'> {}

export interface IGetByNameRes extends Pick<IRole, 'id' | 'name'> {
  claims: IClaimsInRoleRes[];
}

interface IRoleDbService {
  findAll(): Promise<IRoleRes[]>;
  findById(data: IFindByRoleId): Promise<IRoleRes>;
  findByName(data: IFindByRoleName): Promise<IRoleRes>;
  findClaimsForRole(data: IClaimsToRole): Promise<IClaim>;

  create(data: ICreateReq): Promise<void>;
  edit(data: IEditReq): Promise<void>;
  delete(data: IDeleteReq): Promise<void>;
}

@Injectable()
export class RoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  // find all roles in database
  public async findAll(): Promise<IRoleRes[]> {
    const roleList = await handlerErrorDb(this.databaseService.role.findMany());
    return roleList;
  }

  // find role by id
  public async findById({ id }: IFindByRoleId): Promise<IRoleRes> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { id } }));
    return role;
  }

  // find role by name
  public async findByName({ name }: IFindByRoleName): Promise<IRoleRes> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { name } }));
    return role;
  }

  // find claims to role
  public async findClaimsForRole({ roleId }: IClaimsToRole): Promise<IClaim[]> {
    const claimList = await handlerErrorDb(this.databaseService.claim.findMany({ where: { roleId } }));
    return claimList;
  }

  // create role
  public async createRole({ name, claims }: IEditRole): Promise<void> {
    // create role
    const role = await handlerErrorDb(this.databaseService.role.create({ data: { name } }));
    // create new claims to role
    const newClaims = claims.map((item) => this.createClaim({ roleId: role.id, name: item }));
    await Promise.all(newClaims);
  }

  // create admin

  // edit role by id
  public async editRole({ id, name, claims }: IRole): Promise<void> {
    // check on exist role
    const role = await handlerErrorDb(this.findById({ id }));
    if (!role) return null;
    // edit role name
    await handlerErrorDb(this.databaseService.role.update({ data: { name }, where: { id } }));
    // delete all claims to role
    await handlerErrorDb(this.deleteAllClaim({ roleId: id }));
    // create new claims to role
    const newClaims = claims.map((item) => this.createClaim({ roleId: id, name: item }));
    await Promise.all(newClaims);
  }

  // delete role
  public async deleteRole({ id }: IFindByRoleId): Promise<void> {
    // check role on exist
    const role = await this.findById({ id });
    if (!role) return;
    // delete all claims
    await this.deleteAllClaim({ roleId: id });
    // delete role
    await handlerErrorDb(this.databaseService.role.delete({ where: { id } }));
  }

  // create claim to role
  private async createClaim({ roleId, name }: ICreateClaimToRole): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.create({ data: { roleId, name } }));
  }

  // delete all claims to role
  private async deleteAllClaim({ roleId }: IDeleteAllClaims): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId } }));
  }
}
