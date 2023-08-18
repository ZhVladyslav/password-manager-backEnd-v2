import { IsString } from 'class-validator';

/* ----------------  Create user  ---------------- */
export class RegistrationDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}

/* ----------------  Find user by login  ---------------- */
export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
