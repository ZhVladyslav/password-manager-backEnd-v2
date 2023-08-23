import { IsNotEmpty, IsString } from 'class-validator';

export class EditNameDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
