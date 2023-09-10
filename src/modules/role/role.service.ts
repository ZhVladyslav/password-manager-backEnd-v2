import { Injectable, BadRequestException } from '@nestjs/common';
import { IMessageRes } from 'src/types/defaultRes.type';
import { Claims } from 'src/config/claims';
import { RoleDbService } from 'src/database/role.db.service';
import { UserDbService } from 'src/database/user.db.service';
import { ClaimDbService } from 'src/database/claim.db.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleDbService: RoleDbService,
    private readonly claimDbService: ClaimDbService,
  ) {}

  // get all role
  public async getAll(): Promise<any> {
    const roleList = await this.roleDbService.findAll();
    return roleList;
  }

  // get role by id
  public async getById({ id }: { id: string }): Promise<any> {
    // check with role is exist
    const role = await this.roleDbService.findById({ id });
    if (!role) throw new BadRequestException('Role is not found');
    // find role claims
    const roleClaims = await this.claimDbService.findByRoleId({ roleId: role.id });
    return { ...role, claims: roleClaims };
  }

  public async create({ name }: { name: string;}): Promise<IMessageRes> {
    const newRole = await this.roleDbService.create({
      name_en: 'admin',
      name_ua: 'адмін',
      name_ru: 'адмін',
      description_en: '',
      description_ua: '',
      description_ru: '',
    });

    const newClaims = await this.claimDbService.create([{ roleId: newRole.id, claim: Claims.CREATE_ROLE }]);
    return { message: `Role '${name}' is create` };
  }
}
