import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PassCollectionDatabaseService } from './pass-collection.service';
import { PassCollectionController } from './pass-collection.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PassCollectionDatabaseService],
  controllers: [PassCollectionController],
})
export class PassCollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(PassCollectionController);
  }
}
