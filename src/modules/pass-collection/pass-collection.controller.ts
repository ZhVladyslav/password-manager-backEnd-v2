import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Req, Param, Put, Delete } from '@nestjs/common';
import { GetByIdDto } from './dto/getById.dto';
import { CreateDto } from './dto/create.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditDataDto } from './dto/editData.dto';
import { DeleteDto } from './dto/delete.dto';
import { PassCollectionService } from './pass-collection.service';
import { IUserToken } from 'src/types/userToken.type';

@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  /* ----------------  GET  ---------------- */

  @Get('all')
  async all(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.getAll(userToken.userId);
  }

  @UsePipes(new ValidationPipe())
  @Get('/:id')
  async getById(@Req() req: Request, @Param() data: GetByIdDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.getById(userToken.userId, data.id);
  }

  /* ----------------  POST  ---------------- */

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Req() req: Request, @Body() data: CreateDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.create({ userId: userToken.userId, data: data.data, name: data.name });
  }

  /* ----------------  PUT  ---------------- */

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(@Req() req: Request, @Body() data: EditNameDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.editName({ userId: userToken.userId, id: data.id, name: data.name });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-data')
  async editData(@Req() req: Request, @Body() data: EditDataDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.editData({ userId: userToken.userId, id: data.id, data: data.data });
  }

  /* ----------------  DELETE  ---------------- */

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async delete(@Req() req: Request, @Param() data: DeleteDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.passCollectionService.delete({ id: data.id, userId: userToken.userId });
  }
}
