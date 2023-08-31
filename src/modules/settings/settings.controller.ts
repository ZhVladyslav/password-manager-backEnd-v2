import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Claims } from 'src/config/claims';
import { CreateDto } from './dto/Create.dto';
import { SettingsGuard } from 'src/guards/settings.guard';

@Controller('role/setting')
export class RoleController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('all')
  @UseGuards(SettingsGuard)
  async allSetting() {
    return await this.settingsService.getAll();
  }

  @Get('claims')
  @UseGuards(SettingsGuard)
  async allClaimsSetting() {
    return Object.values(Claims);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(SettingsGuard)
  async createSetting(
    @Body() { name, claims }: CreateDto, //
  ) {
    return await this.settingsService.create({ name, claims });
  }
}
