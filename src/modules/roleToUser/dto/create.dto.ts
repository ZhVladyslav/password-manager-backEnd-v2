import { IsNotEmpty, IsString, IsArray, IsUUID } from 'class-validator';
import { regexConfig } from 'src/config/reg';
import { ClaimValidation } from 'src/pipes/claim.pipe';
import { RegValidation } from 'src/pipes/reg.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  roleId: string;
}
