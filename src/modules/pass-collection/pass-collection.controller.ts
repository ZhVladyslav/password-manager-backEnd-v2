import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PassCollectionService } from './pass-collection.service';
import { LoginDto } from './dto/byId.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class PassCollectionController {
  constructor(private readonly passCollectionService: PassCollectionService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto, //
  ) {
    return '';
  }
}
