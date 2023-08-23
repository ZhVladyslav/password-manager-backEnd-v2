import { Controller, Get, Req, Put, Delete, Body } from '@nestjs/common';

import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ----------------  GET  ---------------- */

  @Get('my-account')
  async myAccount(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userService.myAccount(userToken.userId);
  }

  /* ----------------  PUT  ---------------- */

  @Put('edit-name')
  async editName(@Req() req: Request, @Body() data: EditNameDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userService.editName(userToken.userId, data.name);
  }

  @Put('edit-password')
  async editPassword(@Req() req: Request, @Body() data: EditPasswordDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userService.editPassword({ userId: userToken.userId, ...data });
  }

  /* ----------------  DELETE  ---------------- */

  @Delete()
  async delete(@Req() req: Request, @Body() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userService.delete({ password: data.password, userId: userToken.userId });
  }
}
