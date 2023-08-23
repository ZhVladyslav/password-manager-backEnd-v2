import { IsNotEmpty, IsString } from 'class-validator';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
