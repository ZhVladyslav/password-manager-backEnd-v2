import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
