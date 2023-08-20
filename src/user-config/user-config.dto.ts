import { IsString } from 'class-validator';

// CREATE
export class CreateDto {
  @IsString()
  name: string;
}

// EDIT
export class EditDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

// DELETE
export class DeleteDto {
  @IsString()
  id: string;
}
