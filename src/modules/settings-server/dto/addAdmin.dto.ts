import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
}
