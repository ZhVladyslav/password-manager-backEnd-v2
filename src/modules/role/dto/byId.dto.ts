import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ByIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
