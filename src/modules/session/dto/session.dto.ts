import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  id: string[];
}
