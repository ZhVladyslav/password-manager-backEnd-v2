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

  /* ----------------  GET  ---------------- */

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
  async byId(@Param() data: ByIdDto) {
    return await this.roleService.getById(data.id);
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

  /* ----------------  POST  ---------------- */

  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.CREATE_ROLE])
  async create(@Body() data: CreateDto) {
    return await this.roleService.create(data);
  }

  @UsePipes(new ValidationPipe())
  @Post('create-setting')
  @UseGuards(SettingsGuard)
  async createSetting(@Body() data: CreateDto) {
    return await this.roleService.create(data);
  }

  /* ----------------  PUT  ---------------- */

  @UsePipes(new ValidationPipe())
  @Put('edit')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.EDIT_ROLE])
  async edit(@Body() data: EditDto) {
    return await this.roleService.editRole(data);
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.DELETE_ROLE])
  async delete(@Param() data: DeleteDto) {
    return await this.roleService.delete(data.id);
  }
}
