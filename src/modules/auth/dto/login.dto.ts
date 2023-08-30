import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { IsRegexMatch } from 'src/pipes/regex.pipe';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.auth.login, 'login')
  login: string;

  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.auth.password, 'password')
  password: string;
}
