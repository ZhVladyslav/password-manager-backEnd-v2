import { Body, Controller, Delete, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Claims } from 'src/config/claims';
import { ByIdDto } from './dto/byId.dto';
import { DeleteDto } from './dto/delete.dto';
import { EditDto } from './dto/edit.dto';
import { ByNameDto } from './dto/byName.dto';
import { CreateDto } from './dto/create.dto';

@UsePipes(new ValidationPipe())
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  async all() {
    return await this.roleService.getAll();
  }

  @Get('by-id')
  async byId(
    @Query() { id }: ByIdDto, //
  ) {
    return await this.roleService.getById({ id });
  }

  @Get('by-name')
  async byName(
    @Body() { name_en }: ByNameDto, //
  ) {
    return await this.roleService.getByName({ name_en });
  }

  @Get('claims')
  async claims() {
    return Object.values(Claims) as string[];
  }

  @Post('create')
  async create(
    @Body() { name_en, name_ua, name_ru, description_en, description_ua, description_ru, claims }: CreateDto, //
  ) {
    return await this.roleService.create({
      name_en,
      name_ua,
      name_ru,
      description_en,
      description_ua,
      description_ru,
      claims,
    });
  }

  @Put('edit')
  async edit(
    @Body() { id, name_en, name_ua, name_ru, description_en, description_ua, description_ru, claims }: EditDto, //
  ) {
    return await this.roleService.edit({
      id,
      name_en,
      name_ua,
      name_ru,
      description_en,
      description_ua,
      description_ru,
      claims,
    });
  }

  @Delete('delete')
  async delete(
    @Body() { id }: DeleteDto, //
  ) {
    return await this.roleService.delete({ id });
  }
}
