import { IsNotEmpty, IsString } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { IsRegexMatch } from 'src/pipes/regex.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @IsRegexMatch(regexConfig.passCollection.name, 'name')
  name: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
