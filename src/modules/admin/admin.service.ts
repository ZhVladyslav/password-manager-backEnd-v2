import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
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

@Injectable()
export class AdminService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly roleDbService: RoleDbService,
    private readonly roleToUserDbService: RoleToUserDbService,
    private readonly sessionService: SessionDbService,
  ) {}

  public async getUserList(): Promise<any> {
    const usersInDb = await this.userDbService.findAll();
    const rolesToUsersInDb = await this.roleToUserDbService.findAll();
    const rolesInDb = await this.roleDbService.findAll();
    const sessionsInDb = await this.sessionService.findAllToAllUsers();

    const result = [];

    for (let i = 0; i < usersInDb.length; i++) {
      const userId = usersInDb[i].id;
      const userInfo = {
        user: {
          id: usersInDb[i].id,
          name: usersInDb[i].name,
          role_id: null,
          createDate: usersInDb[i].createDate,
        },
        sessionsQuantity: 0,
        roleToUser: null,
        role: null,
      };

      // find role to user
      const roleToUserInfo = rolesToUsersInDb.find((item) => item.userId === userId);
      if (roleToUserInfo) {
        userInfo.roleToUser = roleToUserInfo;

        // find role
        const roleInfo = rolesInDb.find((item) => item.id === roleToUserInfo.roleId);
        if (roleInfo) {
          userInfo.role = roleInfo;
          userInfo.user.role_id = roleInfo.id;
        }
      }

      // find sessions
      sessionsInDb.forEach((item) => {
        if (item.userId === userId) userInfo.sessionsQuantity += 1;
      });

      // push result
      result.push(userInfo);
    }

    return result;
  }

  public async getById({ id }: IById) {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');

    const userInfo = {
      user: {
        id: userInDb.id,
        name: userInDb.name,
        role_id: null,
        createDate: userInDb.createDate,
      },
      sessions: [],
      roleToUser: null,
      role: null,
    };

    const roleToUserInfo = await this.roleToUserDbService.findByUserId({ userId: userInDb.id });
    if (roleToUserInfo) {
      userInfo.roleToUser = roleToUserInfo;

      // find role
      const roleInfo = await this.roleDbService.findById({ id: roleToUserInfo.roleId });
      if (roleInfo) {
        userInfo.role = roleInfo;
      }
    }

    // find sessions
    userInfo.sessions = await this.sessionService.findAll({ userId: userInDb.id });

    return userInfo;
  }
}
