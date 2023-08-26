import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditPasswordDto } from './dto/editPassword.dto';
import { UserService } from './user.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { Claims } from 'src/config/claims';
import { EditRoleDto } from './dto/editRole.dto';
import { DecryptGuard } from 'src/guards/decrypt.guard';
import { DecryptRequest } from 'src/decorators/decryptRequest';
import { SettingsGuard } from 'src/guards/settings.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ----------------  GET  ---------------- */

  @Get('my-account')
  async myAccount(@UserToken() userToken: IUserToken) {
    return await this.userService.myAccount(userToken.userId);
  }

  /* ----------------  PUT  ---------------- */

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(@UserToken() userToken: IUserToken, @Body() data: EditNameDto) {
    return await this.userService.editName(userToken.userId, data.name);
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-password')
  @UseGuards(DecryptGuard)
  async editPassword(@UserToken() userToken: IUserToken, @DecryptRequest() data: EditPasswordDto) {
    return await this.userService.editPassword({ userId: userToken.userId, ...data });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-role')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.SET_USER_ROLE])
  async editRole(@Body() { userId, roleId }: EditRoleDto) {
    return await this.userService.editRole({ userId, roleId });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-role-setting')
  @UseGuards(SettingsGuard)
  async editRoleSetting(@Body() { userId, roleId }: EditRoleDto) {
    return await this.userService.editRole({ userId, roleId });
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async delete(@UserToken() userToken: IUserToken, @Body() data: DeleteDto) {
    return await this.userService.delete({ password: data.password, userId: userToken.userId });
  }
}
