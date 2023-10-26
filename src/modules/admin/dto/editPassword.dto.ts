import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class EditPasswordDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.password)
  password: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.password)
  newPassword: string;
}
