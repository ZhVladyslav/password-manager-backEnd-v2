import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { IUserToken } from 'src/middleware/auth/auth.interface.middleware';
import { CreateDto } from './dto/create.dto';
import { GetByIdDto } from './dto/getById.dto';
import { IssueCommentService } from './issue-comment.service';

@Controller('issue-comment')
export class IssueCommentController {
  constructor(private readonly issueCommentService: IssueCommentService) {}

  /* ----------------  GET  ---------------- */

  @Get()
  async allCommunity(@Body() data: GetByIdDto) {
    return await this.issueCommentService.getComments(data.issueId);
  }

  /* ----------------  POST  ---------------- */

  @Post()
  async createComment(@Req() req: Request, @Body() { issueId, comment }: CreateDto) {
    const userToken = req['userToken'] as IUserToken;
    return await this.issueCommentService.create({ userId: userToken.userId, issueId, comment });
  }
}
