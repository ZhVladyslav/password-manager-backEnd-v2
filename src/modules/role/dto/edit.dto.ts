import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  claims: string[];
}
