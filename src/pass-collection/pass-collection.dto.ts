import { IsString } from 'class-validator';

// GET BY ID
export class GetByIdDto {
  @IsString()
  id: string;
}

// CREATE
export class CreateDto {
  @IsString()
  name: string;

  @IsString()
  data: string;
}

// EDIT NAME
export class EditNameDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

// EDIT DATA
export class EditDataDto {
  @IsString()
  id: string;

  @IsString()
  data: string;
}

// DELETE
export class DeleteDto {
  @IsString()
  id: string;
}
