import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

export interface IPassCollection {
  userId: string;
  name: string;
  data: string;
}

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  add passCollection in database  ---------------- */
  async addPassCollection(data: IPassCollection) {
    return this.databaseService.passCollection.create({ data });
  }
}
