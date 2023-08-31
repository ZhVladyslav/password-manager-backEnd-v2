import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { password as passCheck } from 'src/utils/password';
import { uuid } from 'src/utils/uuid';
import { jwt } from 'src/utils/jwt';
import { AuthDbService } from './auth.db.service';
import { IMessageRes } from 'src/types/defaultRes.type';
import { ILoginReq, ILoginRes, IRegistrationReq } from './auth.type';

interface IAuthService {
  login(data: ILoginReq): Promise<ILoginRes>;
  registration(data: IRegistrationReq): Promise<IMessageRes>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly databaseService: AuthDbService) {}

  public async login({ login, password }: ILoginReq): Promise<ILoginRes> {
    const userInDb = await this.databaseService.findByLogin({ login });
    if (!userInDb) throw new BadRequestException('Invalid user or password');

    const checkPassword = await passCheck.verify(password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    const tokenId = uuid.v4();
    const token = jwt.generate({ userId: userInDb.id, tokenId });
    await this.databaseService.createSession({ userId: userInDb.id, tokenId });

    return { token };
  }

  public async registration({ name, login, password }: IRegistrationReq): Promise<IMessageRes> {
    const userInDb = await this.databaseService.findByLogin({ login });
    if (userInDb) throw new ConflictException('User with this login already exists');

    const passwordHash = await passCheck.generateHash(password);
    await this.databaseService.createUser({ name, login, password: passwordHash });

    return { message: 'User is create' };
  }
}
