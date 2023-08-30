import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  id: string[];
}
