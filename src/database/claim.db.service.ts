import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { handlerErrorDb } from './handlerError.db';
import { IClaim } from 'src/types/claim.type';

interface IFindByRoleId extends Pick<IClaim, 'roleId'> {}
interface ICreate extends Omit<IClaim, 'id' | 'createDate'> {}
interface IDelete extends Pick<IClaim, 'roleId'> {}

interface IClaimDbService {
  findByRoleId(data: IFindByRoleId): Promise<IClaim[]>;
  create(data: ICreate[]): Promise<IClaim[]>;
  delete(data: IDelete): Promise<void>;
}

@Injectable()
export class ClaimDbService implements IClaimDbService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async findByRoleId({ roleId }: IFindByRoleId): Promise<IClaim[]> {
    const claims = await handlerErrorDb(this.databaseService.claim.findMany({ where: { roleId } }));
    return claims;
  }

  public async create(data: ICreate[]): Promise<IClaim[]> {
    // createMany not work
    const promiseCreateClaims = data.map(async (claim) => {
      const claimDb = await handlerErrorDb(this.databaseService.claim.create({ data: claim }));
      if (!claimDb) return null;
      return claimDb;
    });
    const newClaimList = await Promise.all(promiseCreateClaims);
    return newClaimList;
  }

  public async delete({ roleId }: IDelete): Promise<void> {
    await handlerErrorDb(this.databaseService.claim.deleteMany({ where: { roleId } }));
  }
}
