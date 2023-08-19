import { IsString } from 'class-validator';

export class DeleteSessionDto {
  @IsString()
  id: string;
}
