import { Controller, Post, Get, Req, Body, Put } from '@nestjs/common';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { CreateDto } from './dto/create.dto';
import { FixedDto } from './dto/fixed.dto';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  /* ----------------  GET  ---------------- */

  @Get('all')
  async allCommunity() {
    return await this.issueService.all();
  }

  @Get('all-fixed')
  async allCommunityFixed() {
    return await this.issueService.allFixed();
  }

  @Get('my')
  async my(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.issueService.my(userToken.userId);
  }

  @Get('my-fixed')
  async myFixed(@Req() req: Request) {
    const userToken = req['userToken'] as IUserToken;
    return await this.issueService.myFixed(userToken.userId);
  }

  /* ----------------  POST  ---------------- */

  @Post('create')
  async create(@Req() req: Request, @Body() { title, description }: CreateDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.issueService.create({ title, description, userId: userToken.userId });
  }

  /* ----------------  PUT  ---------------- */

  @Put('fixed')
  async fixed(@Req() req: Request, @Body() data: FixedDto) {
    return await this.issueService.fixed(data.id);
  }
}
