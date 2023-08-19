import { IsString } from 'class-validator';

export class CreatePassCollectionDto {
  @IsString()
  name: string;

  @IsString()
  data: string;
}

export class GetByIdPassCollectionDto {
  @IsString()
  id: string;
}

export class EditNamePassCollectionDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class EditDataPassCollectionDto {
  @IsString()
  id: string;

  @IsString()
  data: string;
}

export class DeletePassCollectionDto {
  @IsString()
  id: string;
}
