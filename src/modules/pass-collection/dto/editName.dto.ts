import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.passCollection.name)
  name: string;
}
