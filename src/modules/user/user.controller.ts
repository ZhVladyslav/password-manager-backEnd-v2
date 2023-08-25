import { Controller, Get, Put, Delete, Body, UseGuards, SetMetadata, NotFoundException } from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { Claims } from 'src/config/claims';
import { EditRoleDto } from './dto/editRole.dto';

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

  @Put('edit-role')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.SET_USER_ROLE])
  async editRole(@Body() { userId, roleId }: EditRoleDto) {
    return await this.userService.editRole({ userId, roleId });
  }

  @Put('edit-role-setting')
  async editRoleSetting(@Body() { userId, roleId }: EditRoleDto) {
    if (process.env.SETTING_MODE !== 'true') throw new NotFoundException();
    return await this.userService.editRole({ userId, roleId });
  }

  /* ----------------  DELETE  ---------------- */

  @Delete('delete')
  async delete(@UserToken() userToken: IUserToken, @Body() data: DeleteDto) {
    return await this.userService.delete({ password: data.password, userId: userToken.userId });
  }
}
