import { BadRequestException, Injectable } from '@nestjs/common';
import { Claims } from 'src/config/claims';
import { DatabaseService } from 'src/database/database.service';
import { handlerErrorDb } from 'src/handlers/handlerError.db';
import { IClaim, IRole } from 'src/types/role.type';

interface IRoleRes extends Pick<IRole, 'id' | 'name'> {}
interface ICreateRole extends Pick<IRole, 'name' | 'claims'> {}

interface IRoleDbService {
  findAll(): Promise<IRoleRes[]>;
  findById({ id }: { id: string }): Promise<IRoleRes>;
  findByName({ name }: { name: string }): Promise<IRoleRes>;
  findClaimsForRole({ roleId }: { roleId: string }): Promise<IClaim[]>;
  createRole(data: ICreateRole): Promise<void>;
  createAdmin({ userId }: { userId: string }): Promise<void>;
  editRole(data: IRole): Promise<void>;
  deleteRole({ id }: { id: string }): Promise<void>;
}

@Injectable()
export class RoleDbService implements IRoleDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  // find all roles in database
  public async findAll(): Promise<IRoleRes[]> {
    const roleList = await handlerErrorDb(this.databaseService.role.findMany());
    return roleList;
  }

  // find role by id
  public async findById({ id }: { id: string }): Promise<IRoleRes> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { id } }));
    if (!role) throw new BadRequestException('Role not found');
    return role;
  }

  // find role by name
  public async findByName({ name }: { name: string }): Promise<IRoleRes> {
    const role = await handlerErrorDb(this.databaseService.role.findFirst({ where: { name } }));
    if (!role) throw new BadRequestException('Role not found');
    return role;
  }

  // find claims to role
  public async findClaimsForRole({ roleId }: { roleId: string }): Promise<IClaim[]> {
    const claimList = await handlerErrorDb(this.databaseService.claim.findMany({ where: { roleId } }));
    return claimList;
  }

  // create role
  public async createRole({ name, claims }: ICreateRole): Promise<void> {
    // check role
    const roleList = await this.findByName({ name });
    if (roleList) throw new BadRequestException('A role with this name already exists');
    // create role
    const role = await handlerErrorDb(this.databaseService.role.create({ data: { name } }));
    // create new claims to role
    const newClaims = claims.map((item) => this.createClaim({ roleId: role.id, name: item }));
    await Promise.all(newClaims);
  }

  /**
   * @ERROR not check user id
   */
  // create admin
  public async createAdmin({ userId }: { userId: string }): Promise<void> {
    let adminRole = await this.findByName({ name: 'admin' });
    if (!adminRole) {
      const claims = Object.keys(Claims).map((claim) => claim);
      await this.createRole({ name: 'admin', claims });
      adminRole = await this.findByName({ name: 'admin' });
    }
    if (adminRole) {
      await handlerErrorDb(
        this.databaseService.user.update({
          data: { roleId: adminRole.id },
          where: { id: userId },
        }),
      );
    }
  }

  // edit role by id
  public async editRole({ id, name, claims }: IRole): Promise<void> {
    // check on exist role
    await handlerErrorDb(this.findById({ id }));
    // edit role name
    await handlerErrorDb(this.databaseService.role.update({ data: { name }, where: { id } }));
    // delete all claims to role
    await handlerErrorDb(this.deleteAllClaim({ roleId: id }));
    // create new claims to role
    const newClaims = claims.map((item) => this.createClaim({ roleId: id, name: item }));
    await Promise.all(newClaims);
  }

  // delete role
  public async deleteRole({ id }: { id: string }): Promise<void> {
    // check role on exist
    await this.findById({ id });
    // delete all claims
    await this.deleteAllClaim({ roleId: id });
    // delete role
    await handlerErrorDb(this.databaseService.role.delete({ where: { id } }));
  }

  // create claim to role
  private async createClaim({ roleId, name }: { roleId: string; name: string }): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.create({ data: { roleId, name } }));
  }

  // delete all claims to role
  private async deleteAllClaim({ roleId }: { roleId: string }): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId } }));
  }
}
