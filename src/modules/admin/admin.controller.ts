import { Controller, Get, UsePipes, ValidationPipe, UseGuards, SetMetadata, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ClaimsGuard } from 'src/guards/claims.guard';
import { Claims } from 'src/config/claims';
import { ByIdDto } from './dto/byId.dto copy';

@UseGuards(ClaimsGuard)
@UsePipes(new ValidationPipe())
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @SetMetadata('claims', [Claims.DELETE_ROLE_TO_USER])
  @Get('user-list')
  async getUserList() {
    return await this.adminService.getUserList();
  }

  @SetMetadata('claims', [Claims.DELETE_ROLE_TO_USER])
  @Get('user-info')
  async getUserById(
    @Query() { id }: ByIdDto, //
  ) {
    return await this.adminService.getById({ id });
  }
}
