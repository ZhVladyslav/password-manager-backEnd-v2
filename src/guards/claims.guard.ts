import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClaimDbService } from 'src/database/claim.db.service';
import { UserDbService } from 'src/database/user.db.service';
import { IUserToken } from 'src/types/userToken.type';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userDbService: UserDbService,
    private readonly claimDbService: ClaimDbService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // claims
    const requiredClaims: string[] = this.reflector.get('claims', context.getHandler());

    if (!requiredClaims) return true;
    if (requiredClaims.length === 0) return true;

    // user token
    const request = context.switchToHttp().getRequest();
    const { sessionId, userId, tokenId }: IUserToken = request['userToken'];

    // user in database
    const userInDb = await this.userDbService.findById({ id: userId });
    if (!userInDb) throw new NotFoundException('User is not found');

    // user role claims
    const userClaimsInDb = await this.claimDbService.findByRoleId({ roleId: userInDb.roleId });

    // claims
    const userClaims = userClaimsInDb.map((item) => item.claim);

    const guardResult = requiredClaims.every((claim) => userClaims.includes(claim));

    return guardResult;
  }
}
