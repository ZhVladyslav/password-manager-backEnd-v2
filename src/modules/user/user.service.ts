import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IUser } from 'src/types/user.type';
import { passCheck } from 'src/utils/password';
import { PassCollectionDbService } from 'src/database/passCollection.db.service';
import { SessionDbService } from 'src/database/session.db.service';
import { RoleDbService } from 'src/database/role.db.service';
import { RoleToUserDbService } from 'src/database/roleToUser.db.service';
import { ClaimDbService } from 'src/database/claim.db.service';

interface IService {
  id: string;
  name: string;
  password: string;
  roleId: string;
  userId: string;
}

interface IById extends Pick<IService, 'id'> {}
interface IEditName extends Pick<IService, 'id' | 'name'> {}
interface IEditPassword extends Pick<IService, 'id' | 'password'> {
  newPassword: string;
}
interface IDelete extends Pick<IService, 'id' | 'password'> {}

interface IUserService {
  getById(data: IById): Promise<{ id: string; name: string; createDate: Date }>;
  editName(data: IEditName): Promise<{ message: string }>;
  editPassword(data: IEditPassword): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly roleDbService: RoleDbService,
    private readonly roleToUserDbService: RoleToUserDbService,
    private readonly sessionService: SessionDbService,
    private readonly claimDbService: ClaimDbService,
    private readonly passCollectionService: PassCollectionDbService,
  ) {}

  public async getAll(): Promise<any> {
    const usersInDb = await this.userDbService.findAll();
    const rolesToUsersInDb = await this.roleToUserDbService.findAll();
    const rolesInDb = await this.roleDbService.findAll();
    const claimsInDb = await this.claimDbService.findAll();
    const sessionsInDb = await this.sessionService.findAllToAllUsers();

    const result = [];

    for (let i = 0; i < usersInDb.length; i++) {
      let user = { id: usersInDb[i].id };

      const roleToUser = rolesToUsersInDb.find((item) => item.id === user.id);
      const role = !roleToUser ? '' : rolesInDb.find((item) => item.id === roleToUser.roleId);
      const claims = !role ? '' : claimsInDb.map((item) => item.roleId === role.id);
      const sessions = sessionsInDb.map((item) => item.userId === user.id && item);

      result.push({
        user: {
          id: usersInDb[i].id,
          name: usersInDb[i].name,
          role_id: !roleToUser ? '' : roleToUser.id,
          createDate: usersInDb[i].createDate,
        },
        roleToUser: !roleToUser ? '' : roleToUser,
        role: !role
          ? ''
          : {
              ...role,
              claims,
            },
        sessions,
      });
    }

    return result;
  }

  public async getById({ id }: IById): Promise<{ id: string; name: string; createDate: Date }> {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');
    return { id: userInDb.id, name: userInDb.name, createDate: userInDb.createDate };
  }

  public async editName({ id, name }: IEditName) {
    const userInDb = await this.getById({ id });
    if (userInDb.name === name) throw new BadRequestException('This name already set');

    await this.userDbService.updateName({ id, name });

    return { message: 'User name is edit' };
  }

  public async editPassword({ id, password, newPassword }: IEditPassword) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');
    if (password === newPassword) throw new BadRequestException('This password already is set');

    const newEncryptPassword = await passCheck.generateHash(newPassword);
    await this.userDbService.updatePassword({ id, password: newEncryptPassword });
    await this.sessionService.deleteAll({ userId: id });

    return { message: 'User password is edit' };
  }

  public async delete({ id, password }: IDelete) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');

    await this.sessionService.deleteAll({ userId: id });
    await this.passCollectionService.deleteAll({ userId: id });
    await this.userDbService.delete({ id });

    return { message: 'User is delete' };
  }
}
