import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  roleId: string;
}
