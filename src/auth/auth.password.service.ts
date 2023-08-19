import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/* ----------------  Check password interface  ---------------- */
interface ICheckPassword {
  getPassword: string;
  userPassword: string;
}

@Injectable()
export class AuthPasswordService {
  /* ----------------  Check password  ---------------- */
  async checkPassword(getPassword: string, userPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(getPassword, userPassword);
    return result;
  }

  /* ----------------  Generate password hash  ---------------- */
  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
