import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionDatabaseService } from './session.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SessionDatabaseService],
  controllers: [SessionController],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(SessionController);
  }
}
