import { IsNotEmpty, IsString } from 'class-validator';

export class EditDataDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
