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
import { RoleService } from './role.service';
import { Claims } from 'src/config/claims';
import { ByIdDto } from './dto/byId.dto';
import { CreateDto } from './dto/Create.dto';
import { DeleteDto } from './dto/delete.dto';
import { EditDto } from './dto/edit.dto';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { SettingsGuard } from 'src/guards/settings.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.VIEW_ROLE])
  async all() {
    return await this.roleService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get('byId:id')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.VIEW_ROLE])
  async byId(
    @Param() { id }: ByIdDto, //
  ) {
    return await this.roleService.getById({ id });
  }

  @Get('claims')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.VIEW_CLAIMS])
  async allClaims() {
    return Object.keys(Claims).map((item) => Claims[item]);
  }

  @Get('all-setting')
  @UseGuards(SettingsGuard)
  async allSetting() {
    return await this.roleService.getAll();
  }

  @Get('claims-setting')
  @UseGuards(SettingsGuard)
  async allClaimsSetting() {
    return Object.keys(Claims).map((item) => Claims[item]);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.CREATE_ROLE])
  async create(
    @Body() { name, claims }: CreateDto, //
  ) {
    return await this.roleService.create({ name, claims });
  }

  @UsePipes(new ValidationPipe())
  @Post('create-setting')
  @UseGuards(SettingsGuard)
  async createSetting(
    @Body() { name, claims }: CreateDto, //
  ) {
    return await this.roleService.create({ name, claims });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.EDIT_ROLE])
  async edit(
    @Body() { id, name, claims }: EditDto, //
  ) {
    return await this.roleService.edit({ id, name, claims });
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.DELETE_ROLE])
  async delete(
    @Param() { id }: DeleteDto, //
  ) {
    return await this.roleService.delete({ id });
  }
}
