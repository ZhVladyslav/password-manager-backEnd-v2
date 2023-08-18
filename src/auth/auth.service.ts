import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, RegistrationDto } from './auth.dto';

import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async login(data: LoginDto) {
    return data;
    // return this.databaseService.user.findFirst({
    //   data,
    // });
  }

  async registration(data: RegistrationDto) {
    return this.databaseService.user.create({
      data,
    });
  }

  async view() {
    return this.databaseService.user.findMany();
  }

  
  /* ----------------    ---------------- */

  generateJwt = ():string => {
    const accessToken = jwt.sign(
      {
        sessionId,
        type: jwtConfig.access.type,
      },
      jwtConfig.access.key,
      {
        expiresIn: jwtConfig.access.expTime,
      },
    );
    
    return ''
  }
  
}
