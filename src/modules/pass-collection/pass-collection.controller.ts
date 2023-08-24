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
  async all(@UserToken() userToken: IUserToken) {
    return await this.passCollectionService.getAll(userToken.userId);
  }

  @UsePipes(new ValidationPipe())
  @Get('/:id')
  async getById(@Param() data: GetByIdDto, @UserToken() userToken: IUserToken) {
    return await this.passCollectionService.getById(userToken.userId, data.id);
  }

  /* ----------------  POST  ---------------- */

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@UserToken() userToken: IUserToken, @Body() data: CreateDto) {
    return await this.passCollectionService.create({ userId: userToken.userId, data: data.data, name: data.name });
  }

  /* ----------------  PUT  ---------------- */

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(@UserToken() userToken: IUserToken, @Body() data: EditNameDto) {
    return await this.passCollectionService.editName({ userId: userToken.userId, id: data.id, name: data.name });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-data')
  async editData(@UserToken() userToken: IUserToken, @Body() data: EditDataDto) {
    return await this.passCollectionService.editData({ userId: userToken.userId, id: data.id, data: data.data });
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async delete(@UserToken() userToken: IUserToken, @Body() data: DeleteDto) {
    return await this.passCollectionService.delete({ id: data.id, userId: userToken.userId });
  }
}
