import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PassCollectionService } from './pass-collection.service';
import { ByIdDto } from './dto/byId.dto';
import { UserToken } from 'src/decorators/userToken';
import { IUserToken } from 'src/types/userToken.type';
import { CreateDto } from './dto/create.dto';
import { EditNameDto } from './dto/editName.dto';
import { EditEncryptDataDto } from './dto/editEncryptData.dto';
import { DeleteDto } from '../user/dto/delete.dto';

@UsePipes(new ValidationPipe())
@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  @Post('all')
  async all(
    @UserToken() { userId }: IUserToken, //
  ) {
    return await this.passCollectionService.getAll({ userId });
  }

  @Post('by-id')
  async byId(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: ByIdDto, //
  ) {
    return await this.passCollectionService.getById({ id, userId });
  }

  @Post('create')
  async create(
    @UserToken() { userId }: IUserToken, //
    @Body() { name, encryptData }: CreateDto, //
  ) {
    return await this.passCollectionService.create({ userId, name, encryptData });
  }

  @Post('edit-name')
  async editName(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, name }: EditNameDto, //
  ) {
    return await this.passCollectionService.editName({ id, userId, name });
  }

  @Post('edit-encrypt-data')
  async editEncryptData(
    @UserToken() { userId }: IUserToken, //
    @Body() { id, encryptData }: EditEncryptDataDto, //
  ) {
    return await this.passCollectionService.editEncryptData({ id, userId, encryptData });
  }

  @Post('delete')
  async delete(
    @UserToken() { userId }: IUserToken, //
    @Body() { id }: DeleteDto, //
  ) {
    return await this.passCollectionService.delete({ id, userId });
  }
}
