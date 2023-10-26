import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleToUserService } from './roleToUser.service';
import { ByIdDto } from './dto/byId.dto';
import { SetDto } from './dto/set.dto';
import { ByUserIdDto } from './dto/byUserId.dto';
import { Claims } from 'src/config/claims';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { DeleteDto } from './dto/delete.dto';

@UseGuards(ClaimsGuard)
@UsePipes(new ValidationPipe())
@Controller('role-to-user')
export class RoleToUserController {
  constructor(private readonly roleToUserService: RoleToUserService) {}

  @SetMetadata('claims', [Claims.VIEW_ROLE_TO_USER_ALL])
  @Get('all')
  async all() {
    return await this.roleToUserService.getAll();
  }

  @SetMetadata('claims', [Claims.VIEW_ROLE_TO_USER_BY_ID])
  @Get('by-id')
  async byId(
    @Query() { id }: ByIdDto, //
  ) {
    return await this.roleToUserService.getById({ id });
  }

  @SetMetadata('claims', [Claims.VIEW_ROLE_TO_USER_BY_USER_ID])
  @Get('by-user-id')
  async byUserId(
    @Body() { userId }: ByUserIdDto, //
  ) {
    return await this.roleToUserService.getByUserId({ userId });
  }

  @SetMetadata('claims', [Claims.CREATE_ROLE_TO_USER])
  @Post('set')
  async create(
    @Body() { roleId, userId }: SetDto, //
  ) {
    return await this.roleToUserService.set({ roleId, userId });
  }

  @SetMetadata('claims', [Claims.DELETE_ROLE_TO_USER])
  @Delete('delete')
  async delete(
    @Body() { userId }: DeleteDto, //
  ) {
    return await this.roleToUserService.delete({ userId });
  }
}
