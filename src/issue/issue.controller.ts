import { Controller, Post, Get, Req, Body, Put } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { FixedDto, CreateDto } from './issue.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  @Get('all-community')
  async allCommunity() {
    const res = await this.issueService.allCommunity();
    return res;
  }

  @Get('all-community-not-fixed')
  async allCommunityNotFixed() {
    const res = await this.issueService.allCommunityNotFixed();
    return res;
  }

  @Get('all-community-fixed')
  async allCommunityFixed() {
    const res = await this.issueService.allCommunityFixed();
    return res;
  }

  @Get('my')
  async my(@Req() req: Request) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    const res = await this.issueService.getMy(userToken.userId);

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // POST
  //

  // ----------------------------------------------------------------------

  @Post('create')
  async create(@Req() req: Request, @Body() { title, description }: CreateDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    const res = await this.issueService.create({ title, description, userId: userToken.userId });

    return res;
  }

  // ----------------------------------------------------------------------

  //
  // PUT
  //

  // ----------------------------------------------------------------------

  @Put('fixed')
  async fixed(@Req() req: Request, @Body() data: FixedDto) {
    const res = await this.issueService.fixed(data.id);

    return res;
  }
}
