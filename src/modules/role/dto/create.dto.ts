import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { IsValidClaim } from 'src/pipes/claims.pipe';
import { IsRegexMatch } from 'src/pipes/regex.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.role.name, 'name')
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsValidClaim()
  claims: string[];
} 
