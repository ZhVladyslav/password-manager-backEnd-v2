import { Controller, Get, Req, Delete, Param } from '@nestjs/common';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { SessionDatabaseService } from './session.service';
import { DeleteSessionDto } from './session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly databaseService: SessionDatabaseService) {}

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
    const res = await this.databaseService.getAll(userToken.userId);

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  // delete session
  @Delete('/:id')
  async delete(@Req() req: Request, @Param() data: DeleteSessionDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // get all passCollection
    const res = await this.databaseService.delete(userToken.userId, data.id);

    return res;
  }
}
