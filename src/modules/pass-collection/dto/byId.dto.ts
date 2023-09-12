import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
