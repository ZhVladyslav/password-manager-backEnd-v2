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
import { CreateAdminDto } from './dto/createAdmin.dto';
import { DeleteDto } from './dto/delete.dto';
import { EditDto } from './dto/edit.dto';
import { SettingsGuard } from 'src/guards/settings.guard';
import { ByNameDto } from './dto/byName.dto';
import { CreateDto } from './dto/create.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  // @UseGuards(ClaimsGuard)
  // @SetMetadata('claims', [Claims.CREATE_ROLE])
  async all() {
    return await this.roleService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  // @UseGuards(ClaimsGuard)
  @SetMetadata('claims', [Claims.CREATE_ROLE])
  async create(
    @Body() { name }: CreateDto, //
  ) {
    return await this.roleService.create({ name });
  }
}
