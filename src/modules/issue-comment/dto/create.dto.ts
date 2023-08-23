import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  issueId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
