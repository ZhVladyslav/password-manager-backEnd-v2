import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { IssueCommentService } from './issue-comment.service';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { CreateDto, GetDto } from './issue-comment.dto';

@Controller('issue-comment')
export class IssueCommentController {
  constructor(private readonly issueCommentService: IssueCommentService) {}

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  @Get()
  async allCommunity(@Body() data: GetDto) {
    const res = await this.issueCommentService.get(data.issueId);
    return res;
  }

  // ----------------------------------------------------------------------

  //
  // POST
  //

  // ----------------------------------------------------------------------

  @Post()
  async createComment(@Req() req: Request, @Body() data: CreateDto) {
    // user token
    const userToken = req['userToken'] as IUserToken;

    const res = await this.issueCommentService.create({
      comment: data.comment,
      issueId: data.issueId,
      userId: userToken.userId,
    });
    return res;
  }
}
