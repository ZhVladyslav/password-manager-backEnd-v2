import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsValidClaim } from 'src/pipes/claims.pipe';

export class EditDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsValidClaim()
  claims: string[];
}
