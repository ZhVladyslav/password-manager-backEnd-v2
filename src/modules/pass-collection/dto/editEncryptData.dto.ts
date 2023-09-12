import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditEncryptDataDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  encryptData: string;
}
