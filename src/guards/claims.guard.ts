import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly databaseService: DatabaseService,
  ) {}

  // find claims by role id
  async getClaimsByRoleId(roleId: string) {
    return await handlers.dbError(this.databaseService.claim.findMany({ where: { roleId } }));
  }

  // find claims by role id
  async userByUserId(userId: string) {
    return await handlers.dbError(this.databaseService.user.findFirst({ where: { id: userId } }));
  }

  // ----------------------------------------------------------------------

  //
  // GUARD
  //

  // ----------------------------------------------------------------------

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredClaims = this.reflector.getAllAndOverride<string[]>('claims', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredClaims) {
      return true;
    }

    const userId = context.switchToHttp().getRequest().userToken.userId;
    const userInDb = await this.userByUserId(userId);

    if (!userInDb || !userInDb.roleId) {
      return false;
    }

    const claimsInDb = await this.getClaimsByRoleId(userInDb.roleId);
    const claims = claimsInDb.map((item) => item.name);

    return requiredClaims.every((claim) => claims.includes(claim));
  }
}
