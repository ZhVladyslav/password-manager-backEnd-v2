import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SessionService],
  controllers: [SessionController],
})
export class PassCollectionModule {}
