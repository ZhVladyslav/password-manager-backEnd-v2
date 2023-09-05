import { IsNotEmpty, IsString } from 'class-validator';

export class ByNameDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
