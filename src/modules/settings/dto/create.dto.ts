import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsValidClaim } from 'src/pipes/claims.pipe';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsValidClaim()
  claims: string[];
} 
