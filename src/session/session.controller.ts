import { Controller, Get, Req, Delete, Param } from '@nestjs/common';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { SessionService } from './session.service';
import { DeleteDto } from './session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  // get all sessions
  @Get('all')
  async all(@Req() req: Request) {
    // user token

    const userToken = req['userToken'] as IUserToken;

    // get all passCollection
    const res = await this.sessionService.getAll(userToken.userId);

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  // delete session
  @Delete('/:id')
  async delete(@Req() req: Request, @Param() data: DeleteDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // get all passCollection
    const res = await this.sessionService.delete(userToken.userId, data.id);

    return res;
  }
}
