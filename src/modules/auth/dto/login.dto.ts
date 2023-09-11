import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

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
