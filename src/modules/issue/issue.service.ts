import { Injectable } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';

interface ICreate {
  title: string;
  description: string;
  userId: string;
}

@Injectable()
export class IssueService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  public async all() {
    return await this.findAll();
  }

  public async allFixed() {
    return await this.findAllFixed();
  }

  public async my(userId: string) {
    return await this.findMy(userId);
  }

  public async myFixed(userId: string) {
    return await this.findMyFixed(userId);
  }

  /* ----------------  POST  ---------------- */

  public async create(data: ICreate) {
    return await this.createInDatabase(data);
  }

  /* ----------------  PUT  ---------------- */

  public async fixed(issueId: string) {
    return await this.setFixed(issueId);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  // get all issues
  private async findAll() {
    return await databaseHandler.errors(this.databaseService.issue.findMany());
  }

  // get all fixed issues
  private async findAllFixed() {
    return await databaseHandler.errors(
      this.databaseService.issue.findMany({
        where: { fixed: true },
      }),
    );
  }

  // get my issues
  private async findMy(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.issue.findMany({
        where: { userId },
      }),
    );
  }

  // get my fixed issues
  private async findMyFixed(userId: string) {
    return await databaseHandler.errors(
      this.databaseService.issue.findMany({
        where: { fixed: true, userId },
      }),
    );
  }

  // Create issue
  private async createInDatabase({ title, description, userId }: ICreate) {
    return await databaseHandler.errors(
      this.databaseService.issue.create({
        data: { userId, title, description },
      }),
    );
  }

  private async setFixed(issueId: string) {
    return await databaseHandler.errors(
      this.databaseService.issue.update({
        where: { id: issueId },
        data: { fixed: true },
      }),
    );
  }
}
