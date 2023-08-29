import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session.middleware';
import { SessionService } from './session.service';
import { SessionDbService } from './session.db.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SessionService, SessionDbService],
  controllers: [SessionController],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(SessionController);
  }
}
