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
      throw new InternalServerErrorException('DB error');
    }
  }

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

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

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  async delete(id: string) {
    return await this.handleErrors(
      this.databaseService.user.delete({
        where: { id },
      }),
    );
  }
}
