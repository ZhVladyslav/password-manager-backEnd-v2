import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSessionDto, RegistrationDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  //
  // Login
  //

  // ----------------------------------------------------------------------

  //  Find user by login in database
  async findUserByLogin(login: string) {
    return await this.handleErrors(
      this.databaseService.user.findFirst({
        where: { login: login },
      }),
    );
  }

  //  create session in database
  async createSession(data: CreateSessionDto) {
    return await this.handleErrors(
      this.databaseService.session.create({
        data,
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // Registration
  //

  // ----------------------------------------------------------------------

  //  Create user in database
  async createUserInDatabase(data: { name: string; login: string; password: string }) {
    return await this.handleErrors(
      this.databaseService.user.create({
        data: {
          name: data.name,
          login: data.login,
          password: data.password,
          role: 'USER',
        },
      }),
    );
  }
}
