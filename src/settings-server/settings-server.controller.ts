import { Controller, Post, NotFoundException, Body } from '@nestjs/common';
import { SettingsServerService } from './settings-server.service';

@Controller('settings-server')
export class SettingsServerController {
  constructor(private readonly settingsServerService: SettingsServerService) {}

  // ----------------------------------------------------------------------

  //
  // POST
  //

  // ----------------------------------------------------------------------

  // add admin
  @Post('add-admin')
  async addAdmin(@Body() data: { id: string }) {
    if (process.env.SETTING_MODE !== 'true') throw new NotFoundException('Cannot POST /settings-server/add-admin');

    // get all passCollection
    const res = await this.settingsServerService.addAdmin(data.id);

    return { message: `User '${res.login}' up to admin` };
  }
}
