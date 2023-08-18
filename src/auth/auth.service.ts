import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, RegistrationDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { ICheckPassword, IGenerateJwt } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  Find user by login in database  ---------------- */
  async findUserByLogin(login: string) {
    return this.databaseService.user.findFirst({ where: { login: login } });
  }

  /* ----------------  Create user in database  ---------------- */
  async createUserInDatabase(data: RegistrationDto) {
    return this.databaseService.user.create({
      data,
    });
  }

  /* ----------------  Get all records in database  ---------------- */
  async view() {
    return this.databaseService.user.findMany();
  }

  /* ----------------  Check password  ---------------- */
  async checkPassword({
    getPassword,
    userPassword,
  }: ICheckPassword): Promise<boolean> {
    const result = await bcrypt.compare(getPassword, userPassword);
    return result;
  }

  /* ----------------  Generate password hash  ---------------- */
  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  /* ----------------  Generate uuid V4  ---------------- */
  generateUuid(): string {
    return v4();
  }

  /* ----------------  Generate jwt  ---------------- */
  generateJwt = ({ userId }: IGenerateJwt): string => {
    const accessToken = jwt.sign(
      {
        sessionId: this.generateUuid,
        userId,
      },
      process.env.JWT_KEY,
      { expiresIn: '1y' },
    );

    return accessToken;
  };
}
