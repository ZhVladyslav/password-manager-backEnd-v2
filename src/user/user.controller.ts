import { Controller, Get, Req, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { DeleteDto, EditNameDto, EditPasswordDto } from './user.dto';
import { password } from 'src/config/password';

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

    return {name: user.name}
  }

  // ----------------------------------------------------------------------

  //
  //  PUT
  //

  // ----------------------------------------------------------------------

  // edit name
  @Put('edit-name')
  async editName(@Req() req: Request, @Body() data: EditNameDto) {
    const userToken = req['userToken'] as IUserToken;

    await this.userService.editName(userToken.userId, data.name);

    return { message: 'Name is edited' };
  }

  // edit password
  @Put('edit-password')
  async editPassword(@Req() req: Request, @Body() data: EditPasswordDto) {
    const userToken = req['userToken'] as IUserToken;

    // get user to check password on correct
    const user = await this.userService.getUserById(userToken.userId);
    const checkPassword = await password.verify(data.oldPassword, user.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');

    // write new password
    const newPassword = await password.generateHash(data.password)
    await this.userService.editPassword(userToken.userId, newPassword);

    return { message: 'Password is edited' };
  }

  // ----------------------------------------------------------------------

  //
  //  DELETE
  //

  // ----------------------------------------------------------------------

  @Delete()
  async delete(@Req() req: Request, @Body() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;

    // get user to check password on correct
    const user = await this.userService.getUserById(userToken.userId);
    const checkPassword = await password.verify(data.password, user.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');

    await this.userService.delete(userToken.userId);

    return { message: 'Account is deleted' };
  }
}
