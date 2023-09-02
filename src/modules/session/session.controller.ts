import { Controller, Get, Delete, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { DeleteDto } from './dto/session.dto';
import { SessionService } from './session.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.getAll({ userId });
  }

  @UsePipes(new ValidationPipe())
  @Delete('all')
  async deleteAll(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.deleteAll({ userId });
  }

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async deleteById(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.sessionService.deleteById({ userId, id });
  }
}
