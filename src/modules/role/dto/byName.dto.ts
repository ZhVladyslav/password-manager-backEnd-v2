import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class ByNameDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.role.name)
  name_en: string;
}
