import { IsString } from 'class-validator';

// EDIT NAME
export class EditNameDto {
  @IsString()
  name: string;
}

// EDIT PASSWORD
export class EditPasswordDto {
  @IsString()
  oldPassword: string;
  password: string;
}

// DELETE
export class DeleteDto {
  @IsString()
  password: string;
}
