import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from '../../../config/reg';
import { RegValidation } from '../../../pipes/reg.pipe';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.login)
  login: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.password)
  password: string;
}
