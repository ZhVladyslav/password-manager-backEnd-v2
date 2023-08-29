import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PassCollectionController } from './pass-collection.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { PassCollectionService } from './pass-collection.service';
import { PassCollectionDbService } from './pass-collection.db.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PassCollectionService, PassCollectionDbService],
  controllers: [PassCollectionController],
})
export class PassCollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(PassCollectionController);
  }
}
