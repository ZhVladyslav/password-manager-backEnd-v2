import { IsNotEmpty, IsString } from 'class-validator';

export class AddAdminDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
