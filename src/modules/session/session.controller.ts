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
  async all(@UserToken() userToken: IUserToken) {
    return await this.sessionService.getAll(userToken.userId);
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('delete/:id')
  async delete(@UserToken() userToken: IUserToken, @Param() data: DeleteDto) {
    return await this.sessionService.delete(data.id, userToken.userId);
  }
}
