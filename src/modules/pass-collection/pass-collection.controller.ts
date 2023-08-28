import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GetByIdDto } from './dto/getById.dto';
import { CreateDto } from './dto/create.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditDataDto } from './dto/editData.dto';
import { DeleteDto } from './dto/delete.dto';
import { PassCollectionService } from './pass-collection.service';
import { IUserToken } from 'src/types/userToken.type';
import { UserToken } from 'src/decorators/userToken';

@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  /* ----------------  GET  ---------------- */

  @Get('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.passCollectionService.getAll({ userId });
  }

  @UsePipes(new ValidationPipe())
  @Get('/:id')
  async getById(
    @UserToken() { userId }: IUserToken, //
    @Param() { id }: GetByIdDto, //
  ) {
    return await this.passCollectionService.getById({ id, userId });
  }

  /* ----------------  POST  ---------------- */

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(
    @UserToken() { userId }: IUserToken, //
    @Body() { name, data }: CreateDto, //
  ) {
    return await this.passCollectionService.create({ userId, name, data });
  }

  /* ----------------  PUT  ---------------- */

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, name }: EditNameDto, //
  ) {
    return await this.passCollectionService.editName({ id, userId, name });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-data')
  async editData(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, data }: EditDataDto, //
  ) {
    return await this.passCollectionService.editData({ id, userId, data });
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.passCollectionService.delete({ id, userId });
  }
}
