import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { ClaimValidation } from 'src/pipes/claim.pipe';
import { RegValidation } from 'src/pipes/reg.pipe';

export class EditDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.role.name)
  name_en: string;

  @IsNotEmpty()
  @IsString()
  // @RegValidation(regexConfig.role.name)
  name_ua: string;


  @IsNotEmpty()
  @IsString()
  // @RegValidation(regexConfig.role.name)
  description_en: string;

  @IsNotEmpty()
  @IsString()
  // @RegValidation(regexConfig.role.name)
  description_ua: string;


  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ClaimValidation()
  claims: string[];
}
