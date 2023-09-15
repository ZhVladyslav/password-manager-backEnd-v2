import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { passCheck } from '../../utils/password';
import { uuid } from '../../utils/uuid';
import { jwt } from '../../utils/jwt';
import { UserDbService } from '../../database/user.db.service';
import { SessionDbService } from '../../database/session.db.service';

interface IAuth {
  name: string;
  login: string;
  password: string;
}
interface ILogin extends Pick<IAuth, 'login' | 'password'> {}

interface IAuthService {
  login(data: ILogin): Promise<{ token: string }>;
  registration(data: IAuth): Promise<{ message: string }>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userDbService: UserDbService,
    private readonly sessionDbService: SessionDbService,
  ) {}

  public async login({ login, password }: ILogin): Promise<{ token: string }> {
    const userInDb = await this.userDbService.findByLogin({ login });
    if (!userInDb) throw new BadRequestException('Invalid user or password');

    const checkPassword = await passCheck.verify(password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('Invalid user or password');

    const tokenId = uuid.v4();

    const newSession = await this.sessionDbService.create({
      userId: userInDb.id,
      tokenId,
      expDate: new Date(),
    });

    const token = jwt.generate({
      sessionId: newSession.id,
      userId: userInDb.id,
      tokenId,
    });

    return { token };
  }

  public async registration({ name, login, password }: IAuth): Promise<{ message: string }> {
    const userInDb = await this.userDbService.findByLogin({ login });
    if (userInDb) throw new ConflictException('User with this login already exists');

    const passwordHash = await passCheck.generateHash(password);

    await this.userDbService.create({ name, login, password: passwordHash });

    return { message: 'User is create' };
  }
}
