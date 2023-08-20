import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PassCollectionService {
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

  // get all passCollection by user id
  async findAllByUserId(userId: string) {
    return await this.handleErrors(
      this.databaseService.passCollection.findMany({
        where: { userId },
      }),
    );
  }

  // ----------------------------------------------------------------------

  // get passCollection by id pass collection
  async findByPassId(userId: string, id: string) {
    return await this.handleErrors(
      this.databaseService.passCollection.findFirst({
        where: { userId, id },
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // POST
  //

  // ----------------------------------------------------------------------

  // add passCollection in database
  async create(data: { userId: string; name: string; data: string }) {
    return await this.handleErrors(this.databaseService.passCollection.create({ data }));
  }

  // ----------------------------------------------------------------------

  //
  // PUT
  //

  // ----------------------------------------------------------------------

  // edit name passCollection in database
  async editName({ id, name }: { id: string; name: string }) {
    return await this.handleErrors(
      this.databaseService.passCollection.update({
        where: { id },
        data: { name },
      }),
    );
  }

  // ----------------------------------------------------------------------

  // edit data passCollection in database
  async editData({ id, data }: { id: string; data: string }) {
    return await this.handleErrors(
      this.databaseService.passCollection.update({
        where: { id },
        data: { data },
      }),
    );
  }

  // ----------------------------------------------------------------------

  //
  // DELETE
  //

  // ----------------------------------------------------------------------

  // delete passCollection in database
  async delete({ id }: { id: string }) {
    return await this.handleErrors(
      this.databaseService.passCollection.delete({
        where: { id },
      }),
    );
  }
}
