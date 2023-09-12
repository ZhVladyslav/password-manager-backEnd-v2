import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserToken } from 'src/decorators/userToken';
import { IUserToken } from 'src/types/userToken.type';
import { SessionService } from './session.service';

@UsePipes(new ValidationPipe())
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return '';
  }
}
