import { Controller, Get, Req, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteDto } from './dto/session.dto';
import { SessionService } from './session.service';
import { IUserToken } from 'src/types/userToken.type';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  /* ----------------  GET  ---------------- */

  @Get('all')
  async all(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.sessionService.getAll(userToken.userId);
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async delete(@Req() req: Request, @Param() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.sessionService.delete(data.id, userToken.userId);
  }
}
