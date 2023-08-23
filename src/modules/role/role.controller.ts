import { Controller, Put, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { DeleteDto } from './dto/delete.dto';
import { RoleService } from './role.service';
import { EditDto } from './dto/edit.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /* ----------------  GET  ---------------- */

  @Get('all-claims')
  async getClaims() {
    return this.roleService.allClaims();
  }

  @Get('all-roles')
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('/:id')
  async roleById() {
    return this.roleService.getAllRoles();
  }

  /* ----------------  POST  ---------------- */

  @Post('create')
  async create(@Body() data: CreateDto) {
    return this.roleService.create(data);
  }

  /* ----------------  PUT  ---------------- */

  @Put('')
  async edit(@Body() data: EditDto) {
    return this.roleService.edit(data);
  }

  /* ----------------  DELETE  ---------------- */

  @Delete('/:roleId')
  async delete(@Param() data: DeleteDto) {
    return this.roleService.delete(data);
  }
}
