import { Controller, Post, NotFoundException, Body } from '@nestjs/common';
import { SettingsServerService } from './settings-server.service';
import { AddAdminDto } from './dto/addAdmin.dto';

@Controller('settings-server')
export class SettingsServerController {
  constructor(private readonly settingsServerService: SettingsServerService) {}

  /* ----------------  POST  ---------------- */

  @Post('add-admin')
  async addAdmin(@Body() data: AddAdminDto) {
    if (process.env.SETTING_MODE !== 'true') throw new NotFoundException('Cannot POST /settings-server/add-admin');
    return await this.settingsServerService.addAdmin(data.userId);
  }
}
