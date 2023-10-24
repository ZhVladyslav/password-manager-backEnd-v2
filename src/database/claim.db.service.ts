import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { IClaim, IClaimDbCreate, IClaimDbDelete, IClaimDbFindByRoleId } from 'src/types/claim.type';

interface IClaimDbService {
  findByRoleId(data: IClaimDbFindByRoleId): Promise<IClaim[]>;
  create(data: IClaimDbCreate): Promise<IClaim[]>;
  delete(data: IClaimDbDelete): Promise<void>;
}

@Injectable()
export class ClaimDbService implements IClaimDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findByRoleId({ roleId }: IClaimDbFindByRoleId): Promise<IClaim[]> {
    const claims = await handlerErrorDb(this.databaseService.claim.findMany({ where: { roleId } }));
    return claims;
  }

  public async create({ roleId, claims }: IClaimDbCreate): Promise<IClaim[]> {
    const promiseCreateClaims = claims.map(
      async (claim) => await handlerErrorDb(this.databaseService.claim.create({ data: { roleId, claim } })),
    );
    const newClaimList = await Promise.all(promiseCreateClaims);
    return newClaimList;
  }

  public async delete({ roleId }: IClaimDbDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId } }));
  }
}
