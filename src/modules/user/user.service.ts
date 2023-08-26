import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { password } from '../../utils/password';
import { handlers } from 'src/handlers/handlers';

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
    const { id, name, roleId } = await this.findUserById(userId);
    return { id, name, roleId };
  }

  /* ----------------  PUT  ---------------- */

  // edit name
  async editName(userId: string, name: string) {
    const userInDb = await this.findUserById(userId);
    if (userInDb.name === name) throw new BadRequestException('Error edit user name');
    await this.editNameInDb({ userId, newName: name });
    return { message: 'Name is edit' };
  }

  // edit password
  async editPassword(data: IEditPassword) {
    const userInDb = await this.findUserById(data.userId);

    // check user password
    const checkPassword = await password.verify(data.oldPassword, userInDb.password);
    const checkPasswordDuplicate = await password.verify(data.newPassword, userInDb.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');
    if (checkPasswordDuplicate) throw new BadRequestException('The password is already set');

    const newPassword = await password.generateHash(data.newPassword);

    await this.editPasswordInDb({ newPassword, userId: data.userId });
    await this.deleteSessionsInDb(data.userId);

    return { message: 'Password is edit' };
  }

  // user role edit
  public async editRole({ userId, roleId }: { userId: string; roleId: string | null }) {
    await this.editUserRole({ userId, roleId });
    return { message: 'user role is edit' };
  }

  /* ----------------  DELETE  ---------------- */

  async delete(data: IDeleteUser) {
    const userInDb = await this.findUserById(data.userId);

    const checkPassword = await password.verify(data.password, userInDb.password);
    if (!checkPassword) throw new BadRequestException('The password is not correct');

    await this.deleteSessionsInDb(data.userId);
    await this.deleteUserPassCollectionInDb(data.userId);
    // await this.deleteUserConfigsInDb(data.userId);
    // await this.editIssuesInDb(data.userId);
    // await this.editIssuesCommentInDb(data.userId);
    await this.deleteUserInDb(data.userId);

    return { message: 'User is delete' };
  }

  // ----------------------------------------------------------------------

  //
  // private
  //

  // ----------------------------------------------------------------------

  private async findUserById(userId: string) {
    if (!userId) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.user.findFirst({
        where: { id: userId },
      }),
    );
  }

  private async editNameInDb({ userId, newName }: { userId: string; newName: string }) {
    if (!userId || !newName) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.user.update({
        where: { id: userId },
        data: { name: newName },
      }),
    );
  }

  private async editPasswordInDb({ userId, newPassword }: { userId: string; newPassword: string }) {
    if (!userId || !newPassword) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.user.update({
        where: { id: userId },
        data: { password: newPassword },
      }),
    );
  }

  private async editUserRole({ userId, roleId }: { userId: string; roleId: string | null }) {
    if (!userId) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.user.update({
        where: { id: userId },
        data: { roleId: roleId },
      }),
    );
  }

  private async deleteSessionsInDb(userId: string) {
    if (!userId) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.session.deleteMany({
        where: { userId },
      }),
    );
  }

  private async deleteUserInDb(userId: string) {
    if (!userId) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.user.delete({
        where: { id: userId },
      }),
    );
  }

  private async deleteUserPassCollectionInDb(userId: string) {
    if (!userId) throw new BadRequestException();
    return handlers.dbError(
      this.databaseService.passCollection.deleteMany({
        where: { userId },
      }),
    );
  }

  // private async deleteUserConfigsInDb(userId: string) {
  //   if (!userId) throw new BadRequestException();
  //   return handlers.dbError(
  //     this.databaseService.config.deleteMany({
  //       where: { userId },
  //     }),
  //   );
  // }

  // private async editIssuesInDb(userId: string) {
  //   if (!userId) throw new BadRequestException();
  //   return handlers.dbError(
  //     this.databaseService.issue.updateMany({
  //       where: { userId },
  //       data: { userId: null },
  //     }),
  //   );
  // }

  // private async editIssuesCommentInDb(userId: string) {
  //   if (!userId) throw new BadRequestException();
  //   return handlers.dbError(
  //     this.databaseService.issueComment.updateMany({
  //       where: { userId },
  //       data: { userId: null },
  //     }),
  //   );
  // }
}
