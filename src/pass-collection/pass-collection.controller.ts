import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Req, Param, Put, Delete } from '@nestjs/common';
import { GetByIdDto, CreateDto, EditNameDto, EditDataDto, DeleteDto } from './pass-collection.dto';
import { PassCollectionDatabaseService } from './pass-collection.service';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';

@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly databaseService: PassCollectionDatabaseService) {}

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  // get all passCollection
  @Get('all')
  async all(@Req() req: Request) {
    // user token

    const userToken = req['userToken'] as IUserToken;

    // get all passCollection
    const res = await this.databaseService.findAllByUserId(userToken.userId);

    return res;
  }

  // ----------------------------------------------------------------------

  // get by id passCollection
  @Get('/:id')
  async getById(@Req() req: Request, @Param() data: GetByIdDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // get by id passCollection
    const res = await this.databaseService.findByPassId(userToken.userId, data.id);

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // POST
  //

  // ----------------------------------------------------------------------

  // create passCollection
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Req() req: Request, @Body() data: CreateDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // create passCollection
    const res = await this.databaseService.create({ userId: userToken.userId, data: data.data, name: data.name });

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // PUT
  //

  // ----------------------------------------------------------------------

  // edit name passCollection
  @UsePipes(new ValidationPipe())
  @Put('edit-name')
  async editName(@Req() req: Request, @Body() data: EditNameDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // edit name passCollection
    const res = await this.databaseService.editName({ userId: userToken.userId, id: data.id, name: data.name });

    return res;
  }

  // ----------------------------------------------------------------------

  // edit data passCollection
  @UsePipes(new ValidationPipe())
  @Put('edit-data')
  async editData(@Req() req: Request, @Body() data: EditDataDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // edit data passCollection
    const res = await this.databaseService.editData({ userId: userToken.userId, id: data.id, data: data.data });

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  // delete passCollection
  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async delete(@Req() req: Request, @Param() data: DeleteDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    // delete passCollection
    const res = await this.databaseService.delete({ userId: userToken.userId, id: data.id });

    return res;
  }
}
