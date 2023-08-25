import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  roleId: string | null;
}
