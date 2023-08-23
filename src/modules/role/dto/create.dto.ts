import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  claims: Array<string>;
}
