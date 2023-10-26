import { Body, Controller, Post, UsePipes, ValidationPipe, Delete, Get } from '@nestjs/common';
import { UserToken } from 'src/decorators/userToken';
import { IUserToken } from 'src/types/userToken.type';
import { SessionService } from './session.service';
import { ByIdDto } from './dto/byId.dto';
import { DeleteDto } from './dto/delete.dto';

@UsePipes(new ValidationPipe())
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.getAll({ userId });
  }

  @Post('by-id')
  async byId(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: ByIdDto, //
  ) {
    return await this.sessionService.getById({ id, userId });
  }

  @Delete('logout')
  async logout(
    @UserToken() { userId, sessionId }: IUserToken, //
  ) {
    return await this.sessionService.delete({ id: sessionId, userId });
  }

  @Delete('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.sessionService.delete({ id, userId });
  }
}
