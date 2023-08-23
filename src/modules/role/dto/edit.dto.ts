import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  roleId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  claims: Array<string>;
}
