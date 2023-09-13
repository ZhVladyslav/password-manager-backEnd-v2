import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserToken } from 'src/decorators/userToken';
import { IUserToken } from 'src/types/userToken.type';
import { SessionService } from './session.service';
import { ByIdDto } from './dto/byId.dto';
import { DeleteDto } from './dto/delete.dto';

@UsePipes(new ValidationPipe())
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.all({ userId });
  }

  @Post('by-id')
  async byId(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: ByIdDto, //
  ) {
    return await this.sessionService.byId({ id, userId });
  }

  @Post('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.sessionService.delete({ id, userId });
  }
}
