import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handlers } from 'src/handlers/handlers';

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(userId: string) {
    const res = await this.getAllInDatabase(userId);
    return res;
  }

  async delete(id: string, userId: string) {
    const resFindSession = await this.findSessionInDb(id, userId);
    if (!resFindSession) throw new NotFoundException('Session is not found');
    await this.deleteInDatabase(id, userId);
    return { message: 'Session is delete' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async getAllInDatabase(userId: string) {
    if (!userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.session.findMany({
        where: { userId },
      }),
    );
  }

  private async findSessionInDb(id: string, userId: string) {
    if (!id || !userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.session.findFirst({
        where: { id, userId },
      }),
    );
  }

  private async deleteInDatabase(id: string, userId: string) {
    if (!id || !userId) throw new BadRequestException();
    return await handlers.dbError(
      this.databaseService.session.delete({
        where: { id, userId },
      }),
    );
  }
}
