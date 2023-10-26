import { Controller, Get, Put, Body, UsePipes, ValidationPipe, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { DeleteDto } from './dto/delete.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { EditNameDto } from './dto/editName.dto';

@UseGuards(ClaimsGuard)
@UsePipes(new ValidationPipe())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my-account')
  async myAccount(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.userService.myAccount({ id: userId });
  }

  @Put('edit-name')
  async editName(
    @UserToken() { userId }: IUserToken, //
    @Body() { name }: EditNameDto, //
  ) {
    return await this.userService.editName({ id: userId, name });
  }

  @Put('edit-password')
  async editPassword(
    @UserToken() { userId }: IUserToken, //
    @Body() { password, newPassword }: EditPasswordDto, //
  ) {
    return await this.userService.editPassword({ id: userId, password, newPassword });
  }

  @Delete('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { password }: DeleteDto, //
  ) {
    return await this.userService.delete({ id: userId, password });
  }
}
