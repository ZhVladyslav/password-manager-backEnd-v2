import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Claims } from 'src/config/claims';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

interface ICreate {
  name: string;
  claims: string[];
}

interface IEdit {
  id: string;
  name: string;
  claims: string[];
}

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async getAll() {
    return await this.findAllRoles();
  }

  public async getById(id: string) {
    if (!id) return;
    const roleClaims = await this.getRoleClaims(id);
    const role = await this.findRoleById(id);
    return {
      id: role.id,
      name: role.name,
      claims: roleClaims.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      }),
    };
  }

  /* ----------------  POST  ---------------- */

  public async create({ name, claims }: ICreate) {
    const createRole = await this.createRole(name);
    const serverClaims = Object.keys(Claims).map((item) => Claims[item]);

    for (const claimName of claims) {
      if (!serverClaims.includes(claimName)) continue;
      await this.createClaim({ roleId: createRole.id, claimName });
    }

    return { message: 'Role is create' };
  }

  /* ----------------  PUT  ---------------- */

  public async editRole({ id, name, claims }: IEdit) {
    const serverClaims = Object.keys(Claims).map((item) => Claims[item]);

    await this.editRoleInDb({ id, name });
    await this.deleteClaims(id);

    for (const claimName of claims) {
      if (!serverClaims.includes(claimName)) continue;
      await this.createClaim({ roleId: id, claimName });
    }

    return { message: 'role is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  public async delete(id: string) {
    const findRole = this.findRoleById(id);
    if (!findRole) throw new NotFoundException('Role not found');

    await this.deleteClaims(id);
    await this.editUserRole(id);
    await this.deleteRole(id);

    return { message: 'Role is delete' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  // get all roles
  private async findAllRoles() {
    return await handlers.dbError(this.databaseService.role.findMany());
  }

  // get role by id
  private async findRoleById(id: string) {
    if (!id) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.role.findFirst({
        where: { id },
      }),
    );
  }

  // get role claims
  private async getRoleClaims(roleId: string) {
    if (!roleId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.claim.findMany({
        where: { roleId },
      }),
    );
  }

  // create role
  private async createRole(name: string) {
    if (!name) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.role.create({
        data: { name },
      }),
    );
  }

  // create claim to role
  private async createClaim({ roleId, claimName }: { roleId: string; claimName: string }) {
    if (!roleId || !claimName) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.claim.create({
        data: { roleId, name: claimName },
      }),
    );
  }

  // edit role
  private async editRoleInDb({ id, name }: { id: string; name: string }) {
    if (!id || !name) throw new BadRequestException({ id, name });
    return await handlers.dbError(
      this.databaseService.role.update({
        where: { id },
        data: { name },
      }),
    );
  }

  // delete claims by role id
  private async deleteClaims(roleId: string) {
    if (!roleId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.claim.deleteMany({
        where: { roleId },
      }),
    );
  }

  // edit user role
  private async editUserRole(roleId: string) {
    if (!roleId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.user.updateMany({
        where: { roleId },
        data: { roleId: null },
      }),
    );
  }

  // delete role
  private async deleteRole(roleId: string) {
    if (!roleId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.role.delete({
        where: { id: roleId },
      }),
    );
  }
}
