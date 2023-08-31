import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
