import { IsString } from 'class-validator';

export class CreatePassCollectionDto {
  @IsString()
  name: string;

  @IsString()
  data: string;
}
