import { Body, Controller, Delete, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleToUserService } from './roleToUser.service';
import { ByIdDto } from './dto/byId.dto';
import { DeleteDto } from './dto/delete.dto';
import { EditDto } from './dto/edit.dto';
import { ByUserIdDto } from './dto/byUserId.dto';
import { CreateDto } from './dto/create.dto';

@UsePipes(new ValidationPipe())
@Controller('role-to-user')
export class RoleToUserController {
  constructor(private readonly roleToUserService: RoleToUserService) {}

  @Get('all')
  async all() {
    return await this.roleToUserService.getAll();
  }

  @Get('by-id')
  async byId(
    @Query() { id }: ByIdDto, //
  ) {
    return await this.roleToUserService.getById({ id });
  }

  @Get('by-user-id')
  async byUserId(
    @Body() { userId }: ByUserIdDto, //
  ) {
    return await this.roleToUserService.getByUserId({ userId });
  }

  @Post('create')
  async create(
    @Body() { roleId, userId }: CreateDto, //
  ) {
    return await this.roleToUserService.create({ roleId, userId });
  }

  @Put('edit')
  async edit(
    @Body() { id, roleId }: EditDto, //
  ) {
    return await this.roleToUserService.edit({ id, roleId });
  }

  @Delete('delete')
  async delete(
    @Body() { id }: DeleteDto, //
  ) {
    return await this.roleToUserService.delete({ id });
  }
}
