import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { IsRegexMatch } from 'src/pipes/regex.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.role.name, 'name')
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  claims: string[];
}
