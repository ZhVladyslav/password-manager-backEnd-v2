import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  exports: [DatabaseService],
  providers: [DatabaseService],
  controllers: [],
})
export class DatabaseModule {}
