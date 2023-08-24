import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditDataDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
