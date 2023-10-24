import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { RegValidation } from 'src/pipes/reg.pipe';

export class ByUserIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
}
