import { IsNotEmpty, IsString } from 'class-validator';

export class EditDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
