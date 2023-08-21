import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  // handler error
  private async handleErrors<T>(promise: Promise<T>) {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  async getUserById(id: string) {
    return await this.handleErrors(
      this.databaseService.user.findFirst({
        where: { id },
      }),
    );
  }

  async myAccount(id: string) {
    return await this.handleErrors(
      this.databaseService.user.findFirst({
        where: { id },
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // PUT
  //

  // ----------------------------------------------------------------------

  async editName(id: string, name: string) {
    return await this.handleErrors(
      this.databaseService.user.update({
        where: { id },
        data: { name },
      }),
    );
  }

  async editPassword(id: string, password: string) {
    return await this.handleErrors(
      this.databaseService.user.update({
        where: { id },
        data: { password },
      }),
    );
  }

  async deleteSessions(id: string) {
    return await this.handleErrors(
      this.databaseService.session.deleteMany({
        where: { userId: id },
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  async delete(id: string) {
    await this.handleErrors(
      this.databaseService.passCollection.deleteMany({
        where: { userId: id },
      }),
    );

    await this.handleErrors(
      this.databaseService.session.deleteMany({
        where: { userId: id },
      }),
    );

    await this.handleErrors(
      this.databaseService.user.delete({
        where: { id },
      }),
    );
  }
}
