import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SetDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;
  
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  roleId: string;
}
