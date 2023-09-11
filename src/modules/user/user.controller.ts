import { Controller, Get, Put, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';
import { EditRoleDto } from './dto/editRole.dto';
import { ClaimsSet } from 'src/decorators/claim';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { Claims } from 'src/config/claims';

@UseGuards(ClaimsGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ClaimsSet([Claims.EDIT_ROLE])
  @Get('my-account')
  async myAccount(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.userService.myAccount({ id: userId });
  }


  @UsePipes(new ValidationPipe())
  @Put('edit-role')
  async editPassword(
    @UserToken() { userId }: IUserToken, //
    @Body() { roleId }: EditRoleDto, //
  ) {
    return await this.userService.editRole({ id: userId, roleId });
  }
}
