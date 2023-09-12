import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.passCollection.name)
  name: string;

  @IsNotEmpty()
  @IsString()
  encryptData: string;
}
