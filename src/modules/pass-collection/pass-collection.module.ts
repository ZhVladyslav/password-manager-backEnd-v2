import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassCollectionController } from './pass-collection.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassCollectionService } from './pass-collection.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PassCollectionService],
  controllers: [PassCollectionController],
})
export class PassCollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(PassCollectionController);
  }
}
