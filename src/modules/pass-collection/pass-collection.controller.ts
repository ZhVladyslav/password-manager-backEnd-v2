import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe, Param, Req, Query } from '@nestjs/common';
import { PassCollectionService } from './pass-collection.service';
import { ByIdDto } from './dto/byId.dto';
import { UserToken } from 'src/decorators/userToken';
import { IUserToken } from 'src/types/userToken.type';
import { CreateDto } from './dto/create.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditEncryptDataDto } from './dto/editEncryptData.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  @Get('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.passCollectionService.getAll({ userId });
  }

  @UsePipes(new ValidationPipe())
  @Get('by-id')
  async byId(
    @UserToken() { userId }: IUserToken, //
    @Query() { id }: ByIdDto, //
  ) {
    return await this.passCollectionService.getById({ id, userId });
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(
    @UserToken() { userId }: IUserToken, //
    @Body() { name, encryptData }: CreateDto, //
  ) {
    return await this.passCollectionService.create({ userId, name, encryptData });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, name }: EditNameDto, //
  ) {
    return await this.passCollectionService.editName({ id, userId, name });
  }

  @UsePipes(new ValidationPipe())
  @Put('edit-encrypt-data')
  async editEncryptData(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, encryptData }: EditEncryptDataDto, //
  ) {
    return await this.passCollectionService.editEncryptData({ id, userId, encryptData });
  }

  @UsePipes(new ValidationPipe())
  @Delete('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.passCollectionService.delete({ id, userId });
  }
}
