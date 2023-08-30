import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { IsRegexMatch } from 'src/pipes/regex.pipe';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.passCollection.name, 'name')
  name: string;
}
