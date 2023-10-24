import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDbService } from 'src/database/user.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { IUser } from 'src/types/user.type';
import { passCheck } from 'src/utils/password';
import { PassCollectionDbService } from 'src/database/passCollection.db.service';
import { SessionDbService } from 'src/database/session.db.service';
import { RoleDbService } from 'src/database/role.db.service';

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
  getById(data: IById): Promise<IUser>;
  editName(data: IEditName): Promise<{ message: string }>;
  editPassword(data: IEditPassword): Promise<{ message: string }>;
  delete(data: IDelete): Promise<{ message: string }>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly roleDbService: RoleDbService,
    private readonly sessionService: SessionDbService,
    private readonly passCollectionService: PassCollectionDbService,
  ) {}

  public async getAll(): Promise<any> {
    const userInDb = await this.userDbService.findAll();
    const result = userInDb.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    return result;
  }

  public async getById({ id }: IById): Promise<IUser> {
    const userInDb = await this.userDbService.findById({ id });
    if (!userInDb) throw new NotFoundException('User is not found');
    return userInDb;
  }

  public async editName({ id, name }: IEditName) {
    const userInDb = await this.getById({ id });
    if (userInDb.name === name) throw new BadRequestException('This name already set');

    await this.userDbService.updateName({ id, name });

    return { message: 'User name is edit' };
  }

  public async editPassword({ id, password, newPassword }: IEditPassword) {
    const userInDb = await this.getById({ id });

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');
    if (password === newPassword) throw new BadRequestException('This password already is set');

    const newEncryptPassword = await passCheck.generateHash(newPassword);
    await this.userDbService.updatePassword({ id, password: newEncryptPassword });
    await this.sessionService.deleteAll({ userId: id });

    return { message: 'User password is edit' };
  }

  public async delete({ id, password }: IDelete) {
    const userInDb = await this.getById({ id });

    const checkUserPassword = await passCheck.verify(password, userInDb.password);
    if (!checkUserPassword) throw new BadRequestException('Error password');

    await this.sessionService.deleteAll({ userId: id });
    await this.passCollectionService.deleteAll({ userId: id });
    await this.userDbService.delete({ id });

    return { message: 'User is delete' };
  }
}
