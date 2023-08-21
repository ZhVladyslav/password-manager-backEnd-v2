import { IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  id: string; // to edit
}
