import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  claims: string[];
}
