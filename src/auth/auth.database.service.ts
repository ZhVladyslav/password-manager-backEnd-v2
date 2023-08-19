import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSessionDto, RegistrationDto } from './auth.dto';

@Injectable()
export class AuthDatabaseService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ----------------------------------------------------------------------

  //
  // Login
  //

  // ----------------------------------------------------------------------

  //  Find user by login in database
  async findUserByLogin(login: string) {
    return this.databaseService.user.findFirst({ where: { login: login } });
  }

  //  create session in database
  async createSession(data: CreateSessionDto) {
    return this.databaseService.session.create({ data });
  }

  // ----------------------------------------------------------------------

  //
  // Registration
  //

  // ----------------------------------------------------------------------

  //  Create user in database
  async createUserInDatabase(data: RegistrationDto) {
    return this.databaseService.user.create({ data });
  }
}
