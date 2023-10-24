import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
