import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class AuthUuidService {
  /* ----------------  Generate uuid V4  ---------------- */
  generateUuid(): string {
    return v4();
  }
}
