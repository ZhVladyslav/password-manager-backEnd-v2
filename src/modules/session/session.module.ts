import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';
import { SessionMiddleware } from 'src/middleware/session/session.middleware';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, SessionMiddleware).forRoutes(SessionController);
  }
}
