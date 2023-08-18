import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegistrationDto } from './auth.dto';

@Injectable()
export class AuthDatabaseService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  Find user by login in database  ---------------- */
  async findUserByLogin(login: string) {
    return this.databaseService.user.findFirst({ where: { login: login } });
  }

  /* ----------------  Create user in database  ---------------- */
  async createUserInDatabase(data: RegistrationDto) {
    return this.databaseService.user.create({ data });
  }
}
