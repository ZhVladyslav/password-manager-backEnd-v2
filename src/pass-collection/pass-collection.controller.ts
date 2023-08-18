import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Req } from '@nestjs/common';
import { CreatePassCollectionDto } from './pass-collection.dto';
import { PassCollectionService } from './pass-collection.service';

@Controller('pass-collection')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  /* ----------------  create passCollection  ---------------- */
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createPassCollection(@Body() data: CreatePassCollectionDto) {
    const res = await this.passCollectionService.addPassCollection({ userId: '', data: data.data, name: data.name });
    return res;
  }

  @Get()
  async view(@Req() req: Request) {
    console.log(req['userToken']);

    return { message: '' };
  }
}
