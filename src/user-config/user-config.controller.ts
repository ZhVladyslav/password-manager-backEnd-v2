import { Controller, Get, Req, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { UserConfigService } from './user-config.service';
import { CreateDto, DeleteDto, EditDto } from './user-config.dto';

@Controller('config')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {}

  // ----------------------------------------------------------------------

  //
  //  GET
  //

  // ----------------------------------------------------------------------

  @Get()
  async myAccount(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;

    const configs = await this.userConfigService.getAllConfig(userToken.userId);

    return configs;
  }

  // ----------------------------------------------------------------------

  //
  //  POST
  //

  // ----------------------------------------------------------------------

  @Post()
  async create(@Req() req: Request, @Body() data: CreateDto) {
    const userToken = req['userToken'] as IUserToken;

    await this.userConfigService.create({ userId: userToken.userId, name: data.name, them: '' });

    return { message: 'Config is created' };
  }

  // ----------------------------------------------------------------------

  //
  //  PUT
  //

  // ----------------------------------------------------------------------

  @Put()
  async edit(@Req() req: Request, @Body() data: EditDto) {
    const userToken = req['userToken'] as IUserToken;

    await this.userConfigService.edit({ id: data.id, userId: userToken.userId, name: data.name, them: '' });

    return { message: 'Config is edited' };
  }

  // ----------------------------------------------------------------------

  //
  //  DELETE
  //

  // ----------------------------------------------------------------------

  @Delete()
  async delete(@Req() req: Request, @Body() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;

    await this.userConfigService.delete({ id: data.id, userId: userToken.userId });

    return { message: 'Config is deleted' };
  }
}
