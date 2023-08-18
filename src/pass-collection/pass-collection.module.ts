import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PassCollectionService } from './pass-collection.service';
import { PassCollectionController } from './pass-collection.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [PassCollectionService],
  controllers: [PassCollectionController],
})
export class PassCollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PassCollectionController);
  }
}
