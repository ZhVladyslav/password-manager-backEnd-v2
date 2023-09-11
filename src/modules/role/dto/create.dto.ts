import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { ClaimValidation } from 'src/pipes/claim.pipe';
import { RegValidation } from 'src/pipes/reg.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.role.name)
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ClaimValidation()
  claims: string[];
}
