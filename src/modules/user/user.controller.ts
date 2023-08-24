import { Controller, Get, Req, Put, Delete, Body } from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ----------------  GET  ---------------- */

  @Get('my-account')
  async myAccount(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    const user = await this.userService.myAccount(userToken.userId);
    return {
      id: user.id,
      name: user.name,
      roleId: user.roleId,
    };
  }

  /* ----------------  PUT  ---------------- */

  @Put('edit-name')
  async editName(@Req() req: Request, @Body() data: EditNameDto) {
    const userToken = req['userToken'] as IUserToken;
    await this.userService.editName(userToken.userId, data.name);
    return { message: 'Name is edit' };
  }

  @Put('edit-password')
  async editPassword(@Req() req: Request, @Body() data: EditPasswordDto) {
    const userToken = req['userToken'] as IUserToken;
    await this.userService.editPassword({ userId: userToken.userId, ...data });
    return { message: 'Password is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  @Delete('delete')
  async delete(@Req() req: Request, @Body() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;
    await this.userService.delete({ password: data.password, userId: userToken.userId });
    return { message: 'User is delete' };
  }
}
