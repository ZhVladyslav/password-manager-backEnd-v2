import { Controller, Get, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteDto } from './dto/session.dto';
import { SessionService } from './session.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  /* ----------------  GET  ---------------- */

  @Get('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.getAll({ userId });
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async deleteAll(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.sessionService.deleteAll({ userId });
  }

  @UsePipes(new ValidationPipe())
  @Delete('delete/:id')
  async deleteById(
    @UserToken() { userId }: IUserToken, //
    @Param() { id }: DeleteDto, //
  ) {
    return await this.sessionService.deleteById({ userId, id });
  }
}
