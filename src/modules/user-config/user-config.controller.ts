import { Controller, Get, Req, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { EditDto } from './dto/edit.dto';
import { DeleteDto } from './dto/delete.dto';
import { UserConfigService } from './user-config.service';
import { IUserToken } from 'src/types/userToken.type';

@Controller('config')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {}

  /* ----------------  GET  ---------------- */

  @Get()
  async myAccount(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userConfigService.getAll(userToken.userId);
  }

  /* ----------------  POST  ---------------- */

  @Post()
  async create(@Req() req: Request, @Body() data: CreateDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userConfigService.create({ userId: userToken.userId, name: data.name, them: '' });
  }

  /* ----------------  PUT  ---------------- */

  @Put()
  async edit(@Req() req: Request, @Body() data: EditDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userConfigService.edit({ id: data.id, userId: userToken.userId, name: data.name, them: '' });
  }

  /* ----------------  DELETE  ---------------- */

  @Delete()
  async delete(@Req() req: Request, @Body() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.userConfigService.delete({ id: data.id, userId: userToken.userId });
  }
}
