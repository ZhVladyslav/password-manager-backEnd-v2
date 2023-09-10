import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsArray()
  // @IsNotEmpty()
  // @IsString({ each: true })
  // claims: string[];
}
