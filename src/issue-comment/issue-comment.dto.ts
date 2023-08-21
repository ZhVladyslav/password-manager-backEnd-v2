import { IsString } from 'class-validator';

export class GetDto {
  @IsString()
  issueId: string;
}

export class CreateDto {
  @IsString()
  issueId: string;

  @IsString()
  comment: string;
}
