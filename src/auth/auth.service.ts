import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSessionDto, RegistrationDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  async handleErrors<T>(promise: Promise<T>) {
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
  async createUserInDatabase(data: RegistrationDto) {
    return await this.handleErrors(
      this.databaseService.user.create({
        data,
      }),
    );
  }

  //
  //
  //

  /* ----------------  JWT  ---------------- */

  // generate jwt
  generateJwt = ({ userId, tokenId }: { tokenId: string; userId: string }): string => {
    const accessToken = jwt.sign(
      {
        tokenId,
        userId,
      },
      process.env.JWT_KEY,
      { expiresIn: '1y' },
    );

    return accessToken;
  };

  /* ----------------  Password  ---------------- */

  // Check password
  async checkPassword(getPassword: string, userPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(getPassword, userPassword);
    return result;
  }

  // Generate password hash
  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  /* ----------------  uuuid v4  ---------------- */

  // Generate uuid V4
  generateUuid(): string {
    return v4();
  }
}
