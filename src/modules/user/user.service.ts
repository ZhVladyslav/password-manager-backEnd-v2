import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';

@Injectable()
export class UserService {
  constructor(private readonly userDbService: UserDbService) {}

  async myAccount({ id }: { id: string }): Promise<any> {
    const user = await this.userDbService.findById({ id });
    return user;
  }

  public async editRole({ id, roleId }: { id: string; roleId: string }): Promise<IMessageRes> {
    const user = await this.userDbService.findById({ id });
    if (!user) throw new BadRequestException('User is not  found');

    if (user.roleId === roleId) throw new BadRequestException('This role is already set');

    await this.userDbService.updateRole({ id, roleId });

    return { message: 'User role is edit' };
  }
}
