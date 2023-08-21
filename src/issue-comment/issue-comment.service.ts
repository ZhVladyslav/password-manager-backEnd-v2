import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IssueCommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  // get comments
  async get(issueId: string) {
    return await this.handleErrors(
      this.databaseService.issueComment.findMany({
        where: { issueId },
      }),
    );
  }

  // create comment
  async create(data: { issueId: string; userId: string; comment: string }) {
    return await this.handleErrors(
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
