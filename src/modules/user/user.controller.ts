import { Controller, Get, Put, Delete, Body } from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ----------------  GET  ---------------- */

  @Get('my-account')
  async myAccount(@UserToken() userToken: IUserToken) {
    return await this.userService.myAccount(userToken.userId);
  }

  /* ----------------  PUT  ---------------- */

  @Put('edit-name')
  async editName(@UserToken() userToken: IUserToken, @Body() data: EditNameDto) {
    return await this.userService.editName(userToken.userId, data.name);
  }

  @Put('edit-password')
  async editPassword(@UserToken() userToken: IUserToken, @Body() data: EditPasswordDto) {
    return await this.userService.editPassword({ userId: userToken.userId, ...data });
  }

  /* ----------------  DELETE  ---------------- */

  @Delete('delete')
  async delete(@UserToken() userToken: IUserToken, @Body() data: DeleteDto) {
    return await this.userService.delete({ password: data.password, userId: userToken.userId });
  }
}
