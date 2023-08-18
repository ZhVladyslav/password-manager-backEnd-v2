import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IPassCollection } from './pass-collection.interface';

@Injectable()
export class PassCollectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  /* ----------------  add passCollection in database  ---------------- */
  async addPassCollection(data: IPassCollection) {
    return this.databaseService.passCollection.create({ data });
  }
}
