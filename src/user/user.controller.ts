import { Controller, Get, Req, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ----------------------------------------------------------------------

  //
  //  GET
  //

  // ----------------------------------------------------------------------

  @Get('my-account')
  async myAccount(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;

    const user = await this.userService.myAccount(userToken.userId);

    return user;
  }

  // ----------------------------------------------------------------------

  //
  //  PUT
  //

  // ----------------------------------------------------------------------

  @Put('edit-name')
  async editName(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken

    const user = await this.userService.editName(userToken.userId, 'NewName');

    return user;
  }
  
  @Put('edit-password')
  async editPassword(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken

    const user = await this.userService.editPassword(userToken.userId, 'NewPass');

    return user;
  }

  // ----------------------------------------------------------------------

  //
  //  DELETE
  //

  // ----------------------------------------------------------------------

  @Delete()
  async delete(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;

    const user = await this.userService.delete(userToken.userId);

    return user;
  }
}
