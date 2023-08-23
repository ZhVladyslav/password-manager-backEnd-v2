import { Injectable } from '@nestjs/common';
import { Claims } from 'src/config/claims';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

interface ICreate {
  name: string;
  claims: Array<string>;
}

interface IEdit {
  roleId: string;
  name: string;
  claims: Array<string>;
}

interface IDelete {
  roleId: string;
}

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async allClaims() {
    return Claims;
  }

  public async getAllRoles() {
    return await this.findAllRoles();
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreate) {
    const createdRole = await this.createRole(data.name);

    const createClaimsPromise = data.claims.map(async (item) => {
      return await this.createClaim(createdRole.id, item);
    });

    return Promise.all(createClaimsPromise);
  }

  /* ----------------  PUT  ---------------- */

  public async edit(data: IEdit) {
    await this.deleteClaims(data.roleId);

    data.claims.map(async (item) => {
      await this.createClaim(data.roleId, item);
    });

    return await this.editRole(data.roleId, data.name);
  }

  /* ----------------  DELETE  ---------------- */

  public async delete(data: IDelete) {
    await this.deleteClaims(data.roleId);

    await this.deleteRoleInUsers(data.roleId);

    return await this.deleteRole(data.roleId);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async findAllRoles() {
    return await databaseHandler.errors(this.databaseService.role.findMany());
  }

  private async deleteClaims(roleId: string) {
    return await databaseHandler.errors(
      this.databaseService.claim.deleteMany({
        where: { roleId },
      }),
    );
  }

  private async createClaim(roleId: string, name: string) {
    return await databaseHandler.errors(
      this.databaseService.claim.create({
        data: { roleId, name },
      }),
    );
  }

  private async createRole(name: string) {
    return await databaseHandler.errors(
      this.databaseService.role.create({
        data: { name },
      }),
    );
  }

  private async editRole(roleId: string, name: string) {
    return await databaseHandler.errors(
      this.databaseService.role.update({
        where: { id: roleId },
        data: { name },
      }),
    );
  }

  private async deleteRoleInUsers(roleId: string) {
    return await databaseHandler.errors(
      this.databaseService.user.updateMany({
        where: { roleId },
        data: { roleId: null },
      }),
    );
  }

  private async deleteRole(roleId: string) {
    return await databaseHandler.errors(
      this.databaseService.role.delete({
        where: { id: roleId },
      }),
    );
  }
}
