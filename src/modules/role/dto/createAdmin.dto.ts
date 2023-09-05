import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
} 
