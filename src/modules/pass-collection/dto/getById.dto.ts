import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetByIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
