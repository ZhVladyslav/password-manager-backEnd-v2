import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IssueService {
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

  // get all community issues
  async allCommunity() {
    return await this.handleErrors(this.databaseService.issue.findMany());
  }

  // get all community not fixed issues
  async allCommunityNotFixed() {
    return await this.handleErrors(
      this.databaseService.issue.findMany({
        where: {
          fixed: false,
        },
      }),
    );
  }

  // get all community fixed issues
  async allCommunityFixed() {
    return await this.handleErrors(
      this.databaseService.issue.findMany({
        where: {
          fixed: true,
        },
      }),
    );
  }

  // get my issues
  async getMy(userId: string) {
    return await this.handleErrors(
      this.databaseService.issue.findMany({
        where: { userId },
      }),
    );
  }

  // Create issue
  async create({ title, description, userId }: { title: string; description: string; userId: string }) {
    return await this.handleErrors(
      this.databaseService.issue.create({
        data: {
          userId,
          title,
          description,
        },
      }),
    );
  }

  // Fixed issue
  async fixed(id: string) {
    return await this.handleErrors(
      this.databaseService.issue.update({
        where: { id },
        data: {
          fixed: true,
        },
      }),
    );
  }
}
