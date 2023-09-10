import { IsNotEmpty, IsString } from 'class-validator';
import { RegValidation } from 'src/pipes/reg.pipe';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(/^[a-z]$/)
  password: string;
}
