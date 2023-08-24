import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsArray()
  @IsNotEmpty()
  id: string[];
}
