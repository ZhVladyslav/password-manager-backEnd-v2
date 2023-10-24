import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Claims } from 'src/config/claims';
import { ByIdDto } from './dto/byId.dto';
import { DeleteDto } from './dto/delete.dto';
import { EditDto } from './dto/edit.dto';
import { ByNameDto } from './dto/byName.dto';
import { CreateDto } from './dto/create.dto';
import { ClaimsGuard } from 'src/guards/claims.guard';

@UseGuards(ClaimsGuard)
@UsePipes(new ValidationPipe())
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @SetMetadata('claims', [Claims.VIEW_ROLE_ALL])
  @Get('all')
  async all() {
    return await this.roleService.getAll();
  }

  @SetMetadata('claims', [Claims.VIEW_ROLE_BY_ID])
  @Get('by-id')
  async byId(
    @Query() { id }: ByIdDto, //
  ) {
    return await this.roleService.getById({ id });
  }

  @SetMetadata('claims', [Claims.VIEW_ROLE_BY_NAME])
  @Get('by-name')
  async byName(
    @Body() { name_en }: ByNameDto, //
  ) {
    return await this.roleService.getByName({ name_en });
  }

  @SetMetadata('claims', [Claims.VIEW_CLAIMS])
  @Get('claims')
  async claims() {
    return Object.values(Claims) as string[];
  }

  @SetMetadata('claims', [Claims.CREATE_ROLE])
  @Post('create')
  async create(
    @Body() { name_en, name_ua, name_ru, description_en, description_ua, description_ru, claims }: CreateDto, //
  ) {
    const name = { name_en, name_ua, name_ru };
    const description = { description_en, description_ua, description_ru };
    return await this.roleService.create({ ...name, ...description, claims });
  }

  @SetMetadata('claims', [Claims.EDIT_ROLE])
  @Put('edit')
  async edit(
    @Body() { id, name_en, name_ua, name_ru, description_en, description_ua, description_ru, claims }: EditDto, //
  ) {
    const name = { name_en, name_ua, name_ru };
    const description = { description_en, description_ua, description_ru };
    return await this.roleService.edit({ id, ...name, ...description, claims });
  }

  @SetMetadata('claims', [Claims.DELETE_ROLE])
  @Delete('delete')
  async delete(
    @Body() { id }: DeleteDto, //
  ) {
    return await this.roleService.delete({ id });
  }
}
