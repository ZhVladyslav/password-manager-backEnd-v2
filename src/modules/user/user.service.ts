import { Injectable, BadRequestException } from '@nestjs/common';
import { databaseHandler } from 'src/database/database.handler';
import { DatabaseService } from 'src/database/database.service';
import { password } from 'src/utils/password';

interface IDeleteUser {
  userId: string;
  password: string;
}

interface IEditPassword {
  userId: string;
  newPassword: string;
  oldPassword: string;
}

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  GET  ---------------- */

  async myAccount(userId: string) {
    const userInDb = await this.findUserById(userId);
    return userInDb;
  }

  /* ----------------  PUT  ---------------- */

  // edit name
  async editName(userId: string, name: string) {
    const editResult = await this.editNameInDb({ userId, newName: name });
    return editResult;
  }

  // edit password
  async editPassword(data: IEditPassword) {
    const userInDb = await this.findUserById(data.userId);

    const checkPassword = await password.verify(data.oldPassword, userInDb.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');

    const newPassword = await password.generateHash(data.newPassword);
    const resEditPassword = await this.editPasswordInDb({ newPassword, userId: data.userId });

    await this.deleteSessionsInDb(data.userId);

    return resEditPassword;
  }

  /* ----------------  DELETE  ---------------- */

  async delete(data: IDeleteUser) {
    const userInDb = await this.findUserById(data.userId);

    const checkPassword = await password.verify(data.password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');

    await this.deleteUserInDb(data.userId);
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async findUserById(userId: string) {
    return databaseHandler.errors(
      this.databaseService.user.findFirst({
        where: { id: userId },
      }),
    );
  }

  private async editNameInDb({ userId, newName }: { userId: string; newName: string }) {
    return databaseHandler.errors(
      this.databaseService.user.update({
        where: { id: userId },
        data: { name: newName },
      }),
    );
  }

  private async editPasswordInDb({ userId, newPassword }: { userId: string; newPassword: string }) {
    return databaseHandler.errors(
      this.databaseService.user.update({
        where: { id: userId },
        data: { password: newPassword },
      }),
    );
  }

  private async deleteSessionsInDb(userId: string) {
    return databaseHandler.errors(
      this.databaseService.session.deleteMany({
        where: { userId },
      }),
    );
  }

  private async deleteUserInDb(userId: string) {
    return databaseHandler.errors(
      this.databaseService.user.delete({
        where: { id: userId },
      }),
    );
  }
}