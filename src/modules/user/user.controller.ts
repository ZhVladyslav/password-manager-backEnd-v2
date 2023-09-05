import { Controller, Get, Put, Delete, Body, UseGuards, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { Claims } from 'src/config/claims';
import { EditRoleDto } from './dto/editRole.dto';
import { checkReg } from 'src/utils/checkReg';
import { regexConfig } from 'src/config/reg';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my-account')
  async myAccount(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.userService.myAccount({ id: userId });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(
    @UserToken() { userId }: IUserToken, //
    @Body() { name }: EditNameDto, //
  ) {
    checkReg(regexConfig.user.name, 'name', name);
    return await this.userService.editName({ id: userId, name });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-password')
  async editPassword(
    @UserToken() { userId }: IUserToken, //
    @Body() { password, newPassword }: EditPasswordDto, //
  ) {
    checkReg(regexConfig.user.password, 'password', password);
    checkReg(regexConfig.user.password, 'newPassword', newPassword);
    return await this.userService.editPassword({ id: userId, password, newPassword });
  }

  // @UsePipes(new ValidationPipe())
  // @Put('edit-role')
  // @UseGuards(ClaimsGuard)
  // @SetMetadata('claims', [Claims.SET_USER_ROLE])
  // async editRole(
  //   @Body() { userId, roleId }: EditRoleDto, //
  // ) {
  //   return await this.userService.editRole({ id: userId, roleId });
  // }

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { password }: DeleteDto, //
  ) {
    checkReg(regexConfig.user.password, 'password', password);
    return await this.userService.delete({ id: userId, password });
  }
}
