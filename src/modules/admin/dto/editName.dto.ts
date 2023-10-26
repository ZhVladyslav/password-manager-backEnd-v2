import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.name)
  name: string;
}
