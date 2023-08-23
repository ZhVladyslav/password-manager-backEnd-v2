import { IsNotEmpty, IsString } from 'class-validator';

export class FixedDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
