import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

interface ICreateComment {
  issueId: string;
  userId: string;
  comment: string;
}

@Injectable()
export class IssueCommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async getComments(issueId: string) {
    return this.getCommentsInDatabase(issueId);
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreateComment) {
    return this.createCommentsInDatabase(data);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async getCommentsInDatabase(issueId: string) {
    return await databaseHandler.errors(
      this.databaseService.issueComment.findMany({
        where: { issueId },
      }),
    );
  }

  // create comment
  private async createCommentsInDatabase(data: ICreateComment) {
    return await databaseHandler.errors(
      this.databaseService.issueComment.create({
        data: {
          issueId: data.issueId,
          userId: data.userId,
          comment: data.comment,
        },
      }),
    );
  }
}
