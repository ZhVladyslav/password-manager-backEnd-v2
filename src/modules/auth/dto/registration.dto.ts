import { IsString } from 'class-validator';

export class RegistrationDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
