import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  exports: [DatabaseService],
  providers: [DatabaseService],
  controllers: [],
})
export class PassCollectionModule {}
