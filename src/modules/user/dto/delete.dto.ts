import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
