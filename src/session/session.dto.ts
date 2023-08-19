import { IsString } from 'class-validator';

// DELETE
export class DeleteDto {
  @IsString()
  id: string;
}
