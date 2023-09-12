import { Module } from '@nestjs/common';
import { PassCollectionController } from './pass-collection.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassCollectionService } from './pass-collection.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PassCollectionService],
  controllers: [PassCollectionController],
})
export class PassCollectionModule {}
