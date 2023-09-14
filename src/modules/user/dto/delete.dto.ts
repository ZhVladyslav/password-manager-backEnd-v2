import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @RegValidation(regexConfig.user.password)
  password: string;
}
